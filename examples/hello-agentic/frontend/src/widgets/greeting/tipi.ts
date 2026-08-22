// aiuxer@0.3.2 | 2026-08-22 | Build
export const TIPO = 'greeting' as const;

export interface BloccoGreeting {
  readonly tipo: 'greeting';
  readonly titolo: string;
  readonly sottotitolo?: string;
}
