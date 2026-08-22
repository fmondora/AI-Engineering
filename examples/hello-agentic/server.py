#!/usr/bin/env python3.12
"""Hello Agentic — local server: static UI + /api/chat (LLM picks closed-catalog widgets).

Providers (auto, or HELLO_LLM_PROVIDER=anthropic|xai|grok-cli|claude-cli):
  - anthropic  — ANTHROPIC_API_KEY → api.anthropic.com
  - xai        — XAI_API_KEY       → api.x.ai
  - grok-cli   — `grok -p` on PATH (Grok Build login; preferred when GROK_AGENT=1)
  - claude-cli — `claude -p` on PATH (Claude Code login)

The interactive TUI session authors the product; the browser talks to this
server, which may shell out to the same CLI family that launched it.
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FRONTEND = ROOT / "frontend"
KB_PATH = ROOT / "knowledge" / "faq.md"

PORT = int(os.environ.get("PORT", "8765"))

TIP_IDS = frozenset(
    {
        "what-is-this",
        "who-are-you",
        "twins",
        "genui-band",
        "memory",
        "how-to-talk",
    }
)
TIP_LABEL = {
    "what-is-this": "What is this?",
    "who-are-you": "Who are you?",
    "twins": "The twins",
    "genui-band": "GenUI band",
    "memory": "Memory",
    "how-to-talk": "How to talk",
}
CATALOG = frozenset({"greeting", "faq-card", "tip-chip"})


def load_kb() -> str:
    if KB_PATH.is_file():
        return KB_PATH.read_text(encoding="utf-8")
    return "(knowledge/faq.md missing)"


SYSTEM_PROMPT = f"""You are **Hello Agent**, the only user-facing onboarding guide for the Hello Agentic playground.

## Hard rules
- Answer ONLY from the Knowledge base below. If unknown: say so honestly — never invent product facts.
- Emit UI ONLY as the JSON schema below. No markdown widgets, no HTML, no unknown types.
- Chat chrome (user bubbles, composer, memory sidebar) is shell — do NOT emit it as catalog types.
- No side effects (no writes, email, checkout).
- You decide which widgets to send each turn (composition from the closed catalog).
- Match the user's language (Italian ↔ English).
- **prosa is REQUIRED** every turn (1–3 short sentences). Never leave prosa empty.
- Do **not** spam the full tip list every turn.

## Closed catalog (enum ⊆ renderer)
1. greeting — {{ "tipo": "greeting", "titolo": string, "sottotitolo"?: string }} — only on open / first hello
2. faq-card — {{ "tipo": "faq-card", "domanda": string, "risposta": string, "fonte": "knowledge/faq.md" }} — when answering a KB topic
3. tip-chip — {{ "tipo": "tip-chip", "tipId": one of {sorted(TIP_IDS)}, "etichetta": string }}

Allowed tipId values: {", ".join(sorted(TIP_IDS))}

## Response format (JSON only, no fences)
{{
  "prosa": "required spoken reply",
  "blocchi": [ /* catalog objects you chose */ ],
  "session_patch": {{ "nome"?: string, "lingua"?: "it"|"en", "opened_add"?: [tipId...] }}
}}

## Composition guide
- Open / bare hello ("Hi" / "Ciao"): prosa + greeting + up to 4 tip-chip.
- KB question (twins, GenUI, memory, what is this, what can you do): prosa + **one faq-card** + at most **2** tip-chip (topics not just answered).
- Put covered tip ids in session_patch.opened_add.
- "What can you do?" → faq-card from "How should I talk" / "Who are you" + prosa listing capabilities; max 2 tips.

## Knowledge base
{load_kb()}
"""


def claude_bin() -> str | None:
    return shutil.which(os.environ.get("CLAUDE_BIN", "claude"))


def grok_bin() -> str | None:
    return shutil.which(os.environ.get("GROK_BIN", "grok"))


def resolve_provider() -> dict | None:
    """Return provider dict or None if no LLM available."""
    forced = (os.environ.get("HELLO_LLM_PROVIDER") or "auto").strip().lower()
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY") or os.environ.get("CLAUDE_API_KEY")
    xai_key = os.environ.get("XAI_API_KEY") or os.environ.get("GROK_API_KEY")
    gbin = grok_bin()
    cbin = claude_bin()
    launched_by_grok = os.environ.get("GROK_AGENT") == "1"
    launched_by_claude = bool(
        os.environ.get("CLAUDECODE")
        or os.environ.get("CLAUDE_CODE_ENTRYPOINT")
        or os.environ.get("CLAUDE_CODE_SESSION")
    )

    anthropic = {
        "name": "anthropic",
        "model": os.environ.get("ANTHROPIC_MODEL", "claude-haiku-4-5-20251001"),
        "key": anthropic_key,
    }
    xai = {
        "name": "xai",
        "model": os.environ.get("XAI_MODEL", "grok-4.6"),
        "key": xai_key,
    }
    grok_cli = {
        "name": "grok-cli",
        # Must match `grok models` (currently grok-4.6 / grok-4.5)
        "model": os.environ.get("GROK_CLI_MODEL", "grok-4.6"),
        "key": gbin,
    }
    claude_cli = {
        "name": "claude-cli",
        "model": os.environ.get("CLAUDE_CLI_MODEL", "haiku"),
        "key": cbin,
    }

    if forced in ("anthropic", "api"):
        return anthropic if anthropic_key else None
    if forced == "xai":
        return xai if xai_key else None
    if forced in ("grok-cli", "grok"):
        return grok_cli if gbin else None
    if forced in ("claude-cli", "claude", "cli"):
        return claude_cli if cbin else None

    # auto: API keys (fast) → CLI that launched us → whichever CLI is installed
    if anthropic_key:
        return anthropic
    if xai_key:
        return xai
    if launched_by_grok and gbin:
        return grok_cli
    if launched_by_claude and cbin:
        return claude_cli
    if gbin:
        return grok_cli
    if cbin:
        return claude_cli
    return None


def sanitize_blocco(raw: object) -> dict | None:
    if not isinstance(raw, dict):
        return None
    tipo = raw.get("tipo")
    if tipo not in CATALOG:
        return None
    if tipo == "greeting":
        titolo = str(raw.get("titolo") or "Hello Agent").strip()[:120]
        out: dict = {"tipo": "greeting", "titolo": titolo}
        if raw.get("sottotitolo"):
            out["sottotitolo"] = str(raw["sottotitolo"]).strip()[:200]
        return out
    if tipo == "faq-card":
        return {
            "tipo": "faq-card",
            "domanda": str(raw.get("domanda") or "").strip()[:200],
            "risposta": str(raw.get("risposta") or "").strip()[:2000],
            "fonte": "knowledge/faq.md",
        }
    if tipo == "tip-chip":
        tip_id = str(raw.get("tipId") or "")
        if tip_id not in TIP_IDS:
            return None
        etichetta = str(raw.get("etichetta") or TIP_LABEL[tip_id]).strip()[:80]
        return {"tipo": "tip-chip", "tipId": tip_id, "etichetta": etichetta}
    return None


def sanitize_mossa(data: object, *, provider: str, model: str) -> dict:
    if not isinstance(data, dict):
        return {
            "prosa": "I could not parse a catalog reply. Try a tip.",
            "blocchi": [
                {"tipo": "tip-chip", "tipId": tid, "etichetta": TIP_LABEL[tid]}
                for tid in ("what-is-this", "twins", "how-to-talk")
            ],
            "session_patch": {},
            "mode": "sanitize-fallback",
            "provider": provider,
            "model": model,
        }
    blocchi = []
    for item in data.get("blocchi") or []:
        clean = sanitize_blocco(item)
        if clean:
            blocchi.append(clean)
    patch = data.get("session_patch") if isinstance(data.get("session_patch"), dict) else {}
    opened_add = [tid for tid in (patch.get("opened_add") or []) if tid in TIP_IDS]
    session_patch: dict = {}
    if patch.get("nome"):
        session_patch["nome"] = str(patch["nome"]).strip()[:40]
    if patch.get("lingua") in ("it", "en"):
        session_patch["lingua"] = patch["lingua"]
    if opened_add:
        session_patch["opened_add"] = opened_add
    return {
        "prosa": str(data.get("prosa") or "").strip()[:1500],
        "blocchi": blocchi,
        "session_patch": session_patch,
        "mode": "llm",
        "provider": provider,
        "model": model,
    }


def extract_json(text: str) -> object:
    text = text.strip()
    fence = re.search(r"```(?:json)?\s*([\s\S]*?)```", text)
    if fence:
        text = fence.group(1).strip()
    return json.loads(text)


def build_user_assistant_messages(payload: dict) -> list[dict]:
    history = payload.get("history") or []
    sessione = payload.get("sessione") or {}
    user_text = str(payload.get("text") or "").strip()
    msgs: list[dict] = []
    mem = (
        f"Session memory so far: name={sessione.get('nome')!r}, "
        f"lingua={sessione.get('lingua')!r}, opened={sessione.get('opened')!r}."
    )
    msgs.append({"role": "user", "content": f"[context]\n{mem}"})
    msgs.append(
        {
            "role": "assistant",
            "content": json.dumps(
                {
                    "prosa": "Context noted.",
                    "blocchi": [],
                    "session_patch": {},
                },
                ensure_ascii=False,
            ),
        }
    )
    for turn in history[-12:]:
        role = turn.get("role")
        if role == "user":
            msgs.append({"role": "user", "content": str(turn.get("text") or "")})
        elif role == "agent":
            msgs.append(
                {
                    "role": "assistant",
                    "content": json.dumps(
                        {
                            "prosa": turn.get("text") or "",
                            "blocchi": turn.get("blocchi") or [],
                        },
                        ensure_ascii=False,
                    ),
                }
            )
    msgs.append({"role": "user", "content": user_text or "(open)"})
    return msgs


def call_anthropic(provider: dict, messages: list[dict]) -> str:
    body = json.dumps(
        {
            "model": provider["model"],
            "max_tokens": 1024,
            "temperature": 0.3,
            "system": SYSTEM_PROMPT,
            "messages": messages,
        }
    ).encode("utf-8")
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=body,
        headers={
            "x-api-key": provider["key"],
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        payload = json.loads(resp.read().decode("utf-8"))
    parts = payload.get("content") or []
    texts = [p.get("text", "") for p in parts if p.get("type") == "text"]
    return "\n".join(texts)


def call_xai(provider: dict, messages: list[dict]) -> str:
    base = os.environ.get("XAI_API_BASE", "https://api.x.ai/v1")
    full = [{"role": "system", "content": SYSTEM_PROMPT}, *messages]
    body = json.dumps(
        {
            "model": provider["model"],
            "temperature": 0.3,
            "messages": full,
        }
    ).encode("utf-8")
    req = urllib.request.Request(
        f"{base}/chat/completions",
        data=body,
        headers={
            "Authorization": f"Bearer {provider['key']}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        payload = json.loads(resp.read().decode("utf-8"))
    return payload["choices"][0]["message"]["content"]


def _transcript_blob(messages: list[dict]) -> str:
    transcript = []
    for m in messages:
        role = m.get("role", "user")
        transcript.append(f"{role.upper()}:\n{m.get('content', '')}")
    return (
        "Conversation so far:\n\n"
        + "\n\n".join(transcript)
        + "\n\nRespond now as Hello Agent. Output ONLY one JSON object "
        "(prosa + blocchi + session_patch). No markdown outside JSON."
    )


def call_claude_cli(provider: dict, messages: list[dict]) -> str:
    """Claude Code login via `claude -p` — no ANTHROPIC_API_KEY needed."""
    bin_path = provider["key"]
    if not bin_path:
        raise RuntimeError("claude binary not found on PATH")

    cmd = [
        bin_path,
        "-p",
        _transcript_blob(messages),
        "--system-prompt",
        SYSTEM_PROMPT
        + "\n\nCRITICAL: Your entire reply must be a single JSON object. "
        "No tool use. No explanations outside JSON.",
        "--tools",
        "",
        "--model",
        str(provider["model"]),
        "--output-format",
        "text",
    ]
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        timeout=int(os.environ.get("CLAUDE_CLI_TIMEOUT", "120")),
        cwd="/tmp",
        env={**os.environ, "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"},
    )
    if result.returncode != 0:
        err = (result.stderr or result.stdout or "").strip()[:500]
        raise RuntimeError(f"claude -p failed ({result.returncode}): {err}")
    return result.stdout or ""


def call_grok_cli(provider: dict, messages: list[dict]) -> str:
    """Grok Build login via `grok -p` — uses this CLI's credentials."""
    bin_path = provider["key"]
    if not bin_path:
        raise RuntimeError("grok binary not found on PATH")

    cmd = [
        bin_path,
        "-p",
        _transcript_blob(messages),
        "--system-prompt-override",
        SYSTEM_PROMPT
        + "\n\nCRITICAL: Your entire reply must be a single JSON object. "
        "No tool use. No explanations outside JSON.",
        "--tools",
        "",
        "--output-format",
        "plain",
        "--verbatim",
    ]
    model = provider.get("model")
    if model:
        cmd.extend(["--model", str(model)])

    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        timeout=int(os.environ.get("GROK_CLI_TIMEOUT", "120")),
        cwd="/tmp",
    )
    if result.returncode != 0:
        err = (result.stderr or result.stdout or "").strip()[:500]
        raise RuntimeError(f"grok -p failed ({result.returncode}): {err}")
    return result.stdout or ""


def call_llm(payload: dict) -> dict:
    provider = resolve_provider()
    if not provider:
        raise RuntimeError(
            "No LLM — login `grok` / `claude`, or set ANTHROPIC_API_KEY / XAI_API_KEY"
        )
    messages = build_user_assistant_messages(payload)
    if provider["name"] == "anthropic":
        content = call_anthropic(provider, messages)
    elif provider["name"] == "xai":
        content = call_xai(provider, messages)
    elif provider["name"] == "claude-cli":
        content = call_claude_cli(provider, messages)
    elif provider["name"] == "grok-cli":
        content = call_grok_cli(provider, messages)
    else:
        raise RuntimeError(f"Unknown provider {provider['name']}")
    parsed = extract_json(content)
    return sanitize_mossa(parsed, provider=provider["name"], model=provider["model"])


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(FRONTEND), **kwargs)

    def log_message(self, fmt: str, *args) -> None:
        print(f"[hello-agentic] {self.address_string()} {fmt % args}")

    def _json(self, code: int, obj: dict) -> None:
        raw = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self) -> None:  # noqa: N802
        if self.path.split("?", 1)[0] == "/api/health":
            provider = resolve_provider()
            self._json(
                200,
                {
                    "ok": True,
                    "llm": provider is not None,
                    "provider": provider["name"] if provider else None,
                    "model": provider["model"] if provider else None,
                    "catalog": sorted(CATALOG),
                    "hint": None
                    if provider
                    else "Login `grok` or `claude`, or set ANTHROPIC_API_KEY / XAI_API_KEY",
                },
            )
            return
        super().do_GET()

    def do_POST(self) -> None:  # noqa: N802
        if self.path.split("?", 1)[0] != "/api/chat":
            self.send_error(404)
            return
        length = int(self.headers.get("Content-Length") or 0)
        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8") or "{}")
        except json.JSONDecodeError:
            self._json(400, {"error": "invalid json"})
            return

        if not resolve_provider():
            self._json(
                503,
                {
                    "error": "No LLM available",
                    "hint": "Login `grok` / `claude`, or export ANTHROPIC_API_KEY / XAI_API_KEY",
                    "fallback": "deterministic",
                },
            )
            return

        try:
            self._json(200, call_llm(payload))
        except urllib.error.HTTPError as e:
            detail = e.read().decode("utf-8", errors="replace")[:500]
            self._json(502, {"error": "LLM HTTP error", "status": e.code, "detail": detail})
        except Exception as e:  # noqa: BLE001
            self._json(500, {"error": type(e).__name__, "detail": str(e)[:500]})


def main() -> None:
    provider = resolve_provider()
    httpd = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"Hello Agentic → http://127.0.0.1:{PORT}/")
    print(f"  frontend: {FRONTEND}")
    if provider:
        print(f"  LLM: ON · {provider['name']} · {provider['model']}")
        print("  Hello Agent (LLM) chooses widgets from closed catalog each turn")
        if provider["name"] == "grok-cli":
            print("  Using Grok Build CLI (`grok -p`) — this launcher’s login")
        elif provider["name"] == "claude-cli":
            print("  Using Claude Code CLI (`claude -p`) — Claude login")
    else:
        print("  LLM: OFF — `grok` / `claude` CLI or API keys")
        print("  Demo falls back to deterministic matcher")
    print("  health: GET /api/health · chat: POST /api/chat")
    httpd.serve_forever()


if __name__ == "__main__":
    main()
