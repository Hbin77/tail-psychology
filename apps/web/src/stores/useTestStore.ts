import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface TestStore {
  petType: 'dog' | 'cat' | null;
  petName: string;
  sessionId: string | null;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  freeTextAnswers: Record<string, string>;
  resultId: string | null;
  shareToken: string | null;

  setPetType: (type: 'dog' | 'cat') => void;
  setPetName: (name: string) => void;
  setSessionId: (id: string) => void;
  setAnswer: (questionId: string, choiceId: string) => void;
  setFreeText: (questionId: string, text: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  setCurrentQuestionIndex: (index: number) => void;
  setResultId: (id: string) => void;
  setShareToken: (token: string) => void;
  reset: () => void;
}

const initialState = {
  petType: null as 'dog' | 'cat' | null,
  petName: '',
  sessionId: null as string | null,
  currentQuestionIndex: 0,
  answers: {} as Record<string, string>,
  freeTextAnswers: {} as Record<string, string>,
  resultId: null as string | null,
  shareToken: null as string | null,
};

export const useTestStore = create<TestStore>()(
  persist(
    (set) => ({
      ...initialState,

      setPetType: (type) => set({ petType: type }),
      setPetName: (name) => set({ petName: name }),
      setSessionId: (id) => set({ sessionId: id }),
      setAnswer: (questionId, choiceId) =>
        set((state) => ({ answers: { ...state.answers, [questionId]: choiceId } })),
      setFreeText: (questionId, text) =>
        set((state) => ({ freeTextAnswers: { ...state.freeTextAnswers, [questionId]: text } })),
      nextQuestion: () =>
        set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
      prevQuestion: () =>
        set((state) => ({ currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1) })),
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      setResultId: (id) => set({ resultId: id }),
      setShareToken: (token) => set({ shareToken: token }),
      reset: () => set(initialState),
    }),
    {
      name: 'tail-psychology-test',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
