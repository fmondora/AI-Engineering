#!/usr/bin/env bash
# Launch Hello Agentic demo (works from Claude Code or any terminal).
set -euo pipefail
cd "$(dirname "$0")"

if [[ -n "${ANTHROPIC_API_KEY:-}" || -n "${CLAUDE_API_KEY:-}" ]]; then
  echo "Provider hint: Anthropic API key present"
elif [[ -n "${XAI_API_KEY:-}" || -n "${GROK_API_KEY:-}" ]]; then
  echo "Provider hint: xAI API key present"
elif [[ "${GROK_AGENT:-}" == "1" ]] && command -v grok >/dev/null 2>&1; then
  echo "Provider hint: launched from Grok Build — Hello Agent via \`grok -p\`"
elif command -v grok >/dev/null 2>&1; then
  echo "Provider hint: grok CLI found — Hello Agent via \`grok -p\`"
elif command -v claude >/dev/null 2>&1; then
  echo "Provider hint: claude CLI found — Hello Agent via \`claude -p\`"
else
  echo "No LLM — deterministic fallback. Login \`grok\` or \`claude\`, then re-run"
fi

exec python3.12 server.py
