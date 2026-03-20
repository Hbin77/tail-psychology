'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { useTestStore } from '@/stores/useTestStore';
import { DOG_QUESTIONS, CAT_QUESTIONS } from '@/data/questions';
import { submitResponses, runDiagnosis } from '@/lib/api';
import { ChevronLeft, Send, PenLine, Check } from 'lucide-react';

export default function QuestionsPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as string;
  if (type !== 'dog' && type !== 'cat') {
    router.replace('/select');
    return null;
  }
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [customInputOpen, setCustomInputOpen] = useState<Record<string, boolean>>({});

  const {
    petName,
    sessionId,
    answers,
    freeTextAnswers,
    setAnswer,
    setFreeText,
    setShareToken,
  } = useTestStore();

  const questions = type === 'dog' ? DOG_QUESTIONS : CAT_QUESTIONS;
  const isDog = type === 'dog';
  const totalQuestions = questions.length;

  const handleChoiceSelect = useCallback((questionId: string, choiceId: string) => {
    setAnswer(questionId, choiceId);
    setFreeText(questionId, '');
    setCustomInputOpen((prev) => ({ ...prev, [questionId]: false }));
    setTimeout(() => {
      if (swiperRef.current && swiperRef.current.activeIndex < totalQuestions - 1) {
        swiperRef.current.slideNext();
      }
    }, 500);
  }, [setAnswer, setFreeText, totalQuestions]);

  const handleCustomInputToggle = useCallback((questionId: string) => {
    setCustomInputOpen((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
    // Clear choice when opening custom input
    setAnswer(questionId, '');
  }, [setAnswer]);

  const handleCustomInputConfirm = useCallback((questionId: string) => {
    const text = freeTextAnswers[questionId];
    if (text && text.trim()) {
      setTimeout(() => {
        if (swiperRef.current && swiperRef.current.activeIndex < totalQuestions - 1) {
          swiperRef.current.slideNext();
        }
      }, 300);
    }
  }, [freeTextAnswers, totalQuestions]);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const responses = questions.map((q) => {
        if (q.questionType === 'free_text') {
          return { question_id: q.id, free_text: freeTextAnswers[q.id] || '' };
        }
        // 직접 입력으로 답변한 경우 free_text로 전송
        const customText = freeTextAnswers[q.id];
        if (customText && customText.trim() && !answers[q.id]) {
          return { question_id: q.id, free_text: customText };
        }
        return { question_id: q.id, choice_id: answers[q.id] };
      }).filter((r) => r.choice_id || r.free_text);

      if (sessionId && !sessionId.startsWith('offline')) {
        await submitResponses(sessionId, responses);
        const result = await runDiagnosis(sessionId);
        setShareToken(result.share_token);
      } else {
        setShareToken('demo-' + Date.now());
      }

      router.push(`/test/${type}/loading`);
    } catch {
      setShareToken('demo-' + Date.now());
      router.push(`/test/${type}/loading`);
    }
  };

  const handleBack = () => {
    if (swiperRef.current && activeIndex > 0) {
      swiperRef.current.slidePrev();
    } else {
      router.back();
    }
  };

  const choiceQuestions = questions.filter((q) => q.questionType === 'choice');
  const answeredCount = choiceQuestions.filter(
    (q) => answers[q.id] || (freeTextAnswers[q.id] && freeTextAnswers[q.id].trim())
  ).length;
  const allChoicesAnswered = answeredCount === choiceQuestions.length;

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
      <div className="max-w-md mx-auto w-full px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-[#6B7280]" />
          </button>
          <span className={`text-sm font-bold ${isDog ? 'text-[#C4824E]' : 'text-[#7C6B9E]'}`}>
            Q{activeIndex + 1}/{totalQuestions}
          </span>
          <div className="w-10" />
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${isDog ? 'bg-[#C4824E]' : 'bg-[#7C6B9E]'}`}
            animate={{ width: `${((activeIndex + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <p className="text-center text-xs text-[#9CA3AF] mt-2">
          {petName ? `${petName}의 성격 검사` : '성격 검사'}
        </p>
      </div>

      <div className="flex-1 max-w-md mx-auto w-full">
        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          allowTouchMove={true}
          spaceBetween={16}
          className="h-full px-4"
        >
          {questions.map((question, idx) => (
            <SwiperSlide key={question.id}>
              <div className="flex flex-col items-center justify-start pt-4 pb-8 px-2 w-full">
                {question.questionType === 'choice' ? (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.h2
                        key={question.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xl font-bold text-[#1A1A1A] text-center mb-6 leading-relaxed"
                      >
                        {question.questionText}
                      </motion.h2>
                    </AnimatePresence>

                    <div className="w-full flex flex-col gap-3">
                      {question.choices.map((choice, cidx) => {
                        const isSelected = answers[question.id] === choice.id;
                        return (
                          <motion.button
                            key={choice.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: cidx * 0.1 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleChoiceSelect(question.id, choice.id)}
                            className={`w-full p-4 text-left rounded-xl border transition-all text-sm leading-relaxed ${
                              isSelected
                                ? isDog
                                  ? 'border-[#C4824E] bg-[#FDF6F0] text-[#1A1A1A] shadow-sm'
                                  : 'border-[#7C6B9E] bg-[#F5F0FA] text-[#1A1A1A] shadow-sm'
                                : 'border-gray-200 bg-white text-[#6B7280] hover:border-gray-300'
                            }`}
                          >
                            {choice.text}
                          </motion.button>
                        );
                      })}

                      <motion.button
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleCustomInputToggle(question.id)}
                        className={`w-full p-4 text-left rounded-xl border transition-all text-sm leading-relaxed flex items-center gap-2 ${
                          customInputOpen[question.id]
                            ? isDog
                              ? 'border-[#C4824E] bg-[#FDF6F0] text-[#1A1A1A] shadow-sm'
                              : 'border-[#7C6B9E] bg-[#F5F0FA] text-[#1A1A1A] shadow-sm'
                            : 'border-dashed border-gray-300 bg-white text-[#9CA3AF] hover:border-gray-400'
                        }`}
                      >
                        <PenLine className="w-4 h-4 flex-shrink-0" />
                        해당하는 선택지가 없어요 (직접 입력)
                      </motion.button>

                      <AnimatePresence>
                        {customInputOpen[question.id] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="w-full overflow-hidden"
                          >
                            <div className="flex flex-col gap-2 pt-1">
                              <textarea
                                value={freeTextAnswers[question.id] || ''}
                                onChange={(e) => setFreeText(question.id, e.target.value)}
                                placeholder="우리 아이는 이럴 때 이렇게 해요..."
                                rows={2}
                                maxLength={300}
                                className={`w-full p-3 bg-white rounded-xl border focus:outline-none resize-none text-sm leading-relaxed placeholder:text-[#9CA3AF] ${
                                  isDog ? 'border-[#E8D5C4] focus:border-[#C4824E]' : 'border-[#D4C8E8] focus:border-[#7C6B9E]'
                                }`}
                              />
                              <button
                                onClick={() => handleCustomInputConfirm(question.id)}
                                disabled={!freeTextAnswers[question.id]?.trim()}
                                className={`self-end px-4 py-2 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 ${
                                  isDog
                                    ? 'bg-[#C4824E] hover:bg-[#B3743F]'
                                    : 'bg-[#7C6B9E] hover:bg-[#6B5A8D]'
                                }`}
                              >
                                <Check className="w-4 h-4" />
                                확인
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl font-bold text-[#1A1A1A] text-center mb-4 leading-relaxed"
                    >
                      {question.questionText}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm text-[#9CA3AF] mb-4 text-center"
                    >
                      자유롭게 적어주세요 (선택사항)
                    </motion.p>

                    <motion.textarea
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      value={freeTextAnswers[question.id] || ''}
                      onChange={(e) => setFreeText(question.id, e.target.value)}
                      placeholder="예: 산책하다가 다른 강아지를 보면 엎드려서 기다려요"
                      rows={4}
                      maxLength={500}
                      className={`w-full p-4 bg-white rounded-xl border focus:outline-none resize-none text-sm leading-relaxed placeholder:text-[#9CA3AF] ${
                        isDog ? 'border-[#E8D5C4] focus:border-[#C4824E]' : 'border-[#D4C8E8] focus:border-[#7C6B9E]'
                      }`}
                    />

                    <motion.button
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmit}
                      disabled={!allChoicesAnswered || submitting}
                      className={`w-full h-14 mt-6 text-white text-lg font-bold rounded-xl shadow-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                        isDog
                          ? 'bg-[#C4824E] hover:bg-[#B3743F]'
                          : 'bg-[#7C6B9E] hover:bg-[#6B5A8D]'
                      }`}
                    >
                      {submitting ? '제출 중...' : (
                        <>
                          분석하기
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>

                    {!allChoicesAnswered && (
                      <p className="text-xs text-red-400 mt-2 text-center">
                        모든 질문에 답변해주세요 ({answeredCount}/{choiceQuestions.length})
                      </p>
                    )}
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
