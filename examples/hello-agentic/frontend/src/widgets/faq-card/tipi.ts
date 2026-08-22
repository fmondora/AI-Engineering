// aiuxer@0.3.2 | 2026-08-22 | Build
export const TIPO = 'faq-card' as const;

export interface BloccoFaqCard {
  readonly tipo: 'faq-card';
  readonly domanda: string;
  readonly risposta: string;
  readonly fonte: string;
}
