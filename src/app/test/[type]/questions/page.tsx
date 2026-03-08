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

export default function QuestionsPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as 'dog' | 'cat';
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

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
    // 0.5초 후 자동 다음 슬라이드
    setTimeout(() => {
      if (swiperRef.current && activeIndex < totalQuestions - 1) {
        swiperRef.current.slideNext();
      }
    }, 500);
  }, [setAnswer, activeIndex, totalQuestions]);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      // 응답 데이터 구성
      const responses = questions.map((q) => {
        if (q.questionType === 'free_text') {
          return { question_id: q.id, free_text: freeTextAnswers[q.id] || '' };
        }
        return { question_id: q.id, choice_id: answers[q.id] };
      }).filter((r) => r.choice_id || r.free_text);

      if (sessionId && !sessionId.startsWith('offline')) {
        await submitResponses(sessionId, responses);
        const result = await runDiagnosis(sessionId);
        setShareToken(result.share_token);
      } else {
        // 오프라인 모드 - 임시 토큰
        setShareToken('demo-' + Date.now());
      }

      router.push(`/test/${type}/loading`);
    } catch {
      // 에러 시에도 로딩 페이지로 이동
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

  // 선택지 완료 체크 (자유입력 제외)
  const choiceQuestions = questions.filter((q) => q.questionType === 'choice');
  const answeredCount = choiceQuestions.filter((q) => answers[q.id]).length;
  const allChoicesAnswered = answeredCount === choiceQuestions.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col">
      {/* 상단 헤더 */}
      <div className="max-w-md mx-auto w-full px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-sm text-lg"
          >
            ←
          </button>
          <span className={`text-sm font-bold ${isDog ? 'text-amber-700' : 'text-purple-700'}`}>
            Q{activeIndex + 1}/{totalQuestions}
          </span>
          <div className="w-10" /> {/* spacer */}
        </div>

        {/* 프로그레스바 */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${isDog ? 'bg-amber-500' : 'bg-purple-500'}`}
            animate={{ width: `${((activeIndex + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* 이름 표시 */}
        <p className="text-center text-xs text-gray-400 mt-2">
          {petName ? `${petName}의 성격 검사` : '성격 검사'}
        </p>
      </div>

      {/* Swiper 질문 카드 */}
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
                    {/* 질문 텍스트 */}
                    <AnimatePresence mode="wait">
                      <motion.h2
                        key={question.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xl font-bold text-gray-800 text-center mb-6 leading-relaxed"
                      >
                        {question.questionText}
                      </motion.h2>
                    </AnimatePresence>

                    {/* 선택지 */}
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
                            className={`w-full p-4 text-left rounded-2xl border-2 transition-all text-sm leading-relaxed ${
                              isSelected
                                ? isDog
                                  ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-md'
                                  : 'border-purple-500 bg-purple-50 text-purple-900 shadow-md'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            {choice.text}
                          </motion.button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    {/* 자유입력 (마지막 카드) */}
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl font-bold text-gray-800 text-center mb-4 leading-relaxed"
                    >
                      {question.questionText}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm text-gray-400 mb-4 text-center"
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
                      className="w-full p-4 bg-white rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none resize-none text-sm leading-relaxed placeholder:text-gray-300"
                    />

                    <motion.button
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmit}
                      disabled={!allChoicesAnswered || submitting}
                      className={`w-full h-14 mt-6 text-white text-lg font-bold rounded-2xl shadow-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                        isDog
                          ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30'
                          : 'bg-purple-500 hover:bg-purple-600 shadow-purple-500/30'
                      }`}
                    >
                      {submitting ? '제출 중...' : '분석하기 🔬'}
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
