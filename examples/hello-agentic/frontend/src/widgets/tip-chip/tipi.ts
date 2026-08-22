// aiuxer@0.3.2 | 2026-08-22 | Build
export const TIPO = 'tip-chip' as const;

export const TIP_IDS = [
  'what-is-this',
  'who-are-you',
  'twins',
  'genui-band',
  'memory',
  'how-to-talk',
] as const;

export type TipId = (typeof TIP_IDS)[number];

export const TIP_LABEL: Record<TipId, string> = {
  'what-is-this': 'What is this?',
  'who-are-you': 'Who are you?',
  twins: 'The twins',
  'genui-band': 'GenUI band',
  memory: 'Memory',
  'how-to-talk': 'How to talk',
};

export interface BloccoTipChip {
  readonly tipo: 'tip-chip';
  readonly tipId: TipId;
  readonly etichetta: string;
}
