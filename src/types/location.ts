export interface StorySteps {
  tarikanPembuka: string;
  faktaDisahkan: string;
  maknaTempat: string;
  hubunganPelawat: string;
  soalanAtauAjakan: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface SourceReference {
  label: string;
  url?: string;
  verified: boolean;
}

export type VerificationState = 'verified' | 'partial' | 'empty';
export type AccentTheme = 'cobalt' | 'teal' | 'emerald' | 'amber';

export interface LocationItem {
  id: string;
  name: string;
  imageLabel: string;
  suppliedImageUrls?: string[];
  accentTheme: AccentTheme;
  verificationState: VerificationState;
  statusLabel: string;
  cardSummary: string;
  facts: string[];
  storySteps: StorySteps | null;
  keywords: string[];
  quiz: QuizQuestion[];
  sources: SourceReference[];
  reviewNote: string;
}
