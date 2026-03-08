// 꼬리심리학 - 프론트/백 공유 타입 정의

export type PetCategory = 'dog' | 'cat';

export type Axis = 'energy' | 'social' | 'sensitivity' | 'curiosity';

/** 4글자 유형 코드 (예: ASDE) */
export type TypeCode = string;

export interface PetType {
  code: TypeCode;
  characterName: string;
  characterEmoji: string;
  category: PetCategory;
  description: string;
  compatibleType: TypeCode;
}

export interface Choice {
  id: string;
  text: string;
  axisWeights: Record<Axis, number>;
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
  characterEmoji: string;
  axisScores: Record<Axis, number>;
  description: string;
  compatibility: PetType;
  shareToken: string;
  shareUrl: string;
}
