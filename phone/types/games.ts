import Verb from '@/models/Verb';

// Type options
export interface GameGenerateOptionType {
  label: string;
  number: number;
  isCorrect: boolean;
}

// Types questions
export interface GameGenerateQuestionType {
  question: string;
  options: GameGenerateOptionType[];
}

// Type resoults
export interface GameResulDefaultType {
  failsCount: number;
  successCount: number;
  totalPoints: number;
  isWin: boolean;
  title?: string;
  description?: string;
}

// Type valid keys verb
export type ValidKeysTypeVerb = Exclude<keyof Verb, 'no' | 'type'>;

// Type game
export type GameQuestionVerbType = {
  questionKey: ValidKeysTypeVerb;
  answerKey: ValidKeysTypeVerb;
};
