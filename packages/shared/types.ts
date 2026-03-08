// 꼬리심리학 - 프론트/백 공유 타입 정의

export type PetCategory = 'dog' | 'cat';

export type DogAxis = 'extraversion' | 'amicability' | 'neuroticism' | 'trainability';
export type CatAxis = 'extraversion' | 'amicability' | 'neuroticism' | 'dominance';
export type Axis = DogAxis | CatAxis;

/** 4글자 유형 코드 (예: EAST, EASD) */
export type TypeCode = string;

export interface PetType {
  code: TypeCode;
  characterName: string;
  icon: string;
  category: PetCategory;
  description: string;
  compatibleType: TypeCode;
}

export interface Choice {
  id: string;
  text: string;
  axisWeights: Partial<Record<Axis, number>>;
}

export type QuestionType = 'choice' | 'free_text';

export interface Question {
  id: string;
  petCategory: PetCategory;
  questionText: string;
  questionType: QuestionType;
  axis: Axis | null;
  choices: Choice[];
  orderIndex: number;
}

export interface DiagnosisResult {
  typeCode: TypeCode;
  characterName: string;
  axisScores: Partial<Record<Axis, number>>;
  description: string;
  compatibility: PetType;
  shareToken: string;
  shareUrl: string;
}
