import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface TestStore {
  petType: 'dog' | 'cat' | null;
  petName: string;
  petBreed: string;
  sessionId: string | null;
  answers: Record<string, string>;
  freeTextAnswers: Record<string, string>;
  shareToken: string | null;

  setPetType: (type: 'dog' | 'cat') => void;
  setPetName: (name: string) => void;
  setPetBreed: (breed: string) => void;
  setSessionId: (id: string) => void;
  setAnswer: (questionId: string, choiceId: string) => void;
  setFreeText: (questionId: string, text: string) => void;
  setShareToken: (token: string) => void;
  reset: () => void;
}

const initialState = {
  petType: null as 'dog' | 'cat' | null,
  petName: '',
  petBreed: '',
  sessionId: null as string | null,
  answers: {} as Record<string, string>,
  freeTextAnswers: {} as Record<string, string>,
  shareToken: null as string | null,
};

export const useTestStore = create<TestStore>()(
  persist(
    (set) => ({
      ...initialState,

      setPetType: (type) => set({ petType: type }),
      setPetName: (name) => set({ petName: name }),
      setPetBreed: (breed) => set({ petBreed: breed }),
      setSessionId: (id) => set({ sessionId: id }),
      setAnswer: (questionId, choiceId) =>
        set((state) => ({ answers: { ...state.answers, [questionId]: choiceId } })),
      setFreeText: (questionId, text) =>
        set((state) => ({ freeTextAnswers: { ...state.freeTextAnswers, [questionId]: text } })),
      setShareToken: (token) => set({ shareToken: token }),
      reset: () => set(initialState),
    }),
    {
      name: 'tail-psychology-test',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
