'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { useTestStore } from '@/stores/useTestStore';

const steps = [
  { text: '행동 패턴 분석', delay: 800 },
  { text: '성격 유형 매칭', delay: 1600 },
  { text: '맞춤 설명 생성', delay: 2400 },
];

export default function LoadingPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as string;
  const { shareToken } = useTestStore();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const isDog = type === 'dog';

  useEffect(() => {
    // 단계별 체크 애니메이션
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, idx]);
      }, step.delay);
    });

    // 최소 3초 후 결과 페이지로 이동
    const timer = setTimeout(() => {
      if (shareToken) {
        router.replace(`/result/${shareToken}`);
      } else {
        router.replace('/');
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [router, shareToken]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-md mx-auto w-full flex flex-col items-center gap-8">
        {/* 꼬리 흔드는 애니메이션 */}
        <motion.div
          animate={{ rotate: [0, 30, -30, 30, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-8xl"
        >
          {isDog ? '🐶' : '🐱'}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold text-gray-800"
        >
          꼬리 심리 분석 중... 🔬
        </motion.h2>

        {/* 단계별 체크리스트 */}
        <div className="w-full flex flex-col gap-4">
          {steps.map((step, idx) => {
            const isCompleted = completedSteps.includes(idx);
            const isActive = !isCompleted && (idx === 0 || completedSteps.includes(idx - 1));

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.3 }}
                className="flex items-center gap-3 px-4"
              >
                <span className="text-xl">
                  {isCompleted ? '✅' : isActive ? '⏳' : '⬜'}
                </span>
                <span
                  className={`text-base font-medium ${
                    isCompleted ? 'text-gray-800' : 'text-gray-400'
                  }`}
                >
                  {step.text}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* 로딩 바 */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${isDog ? 'bg-amber-500' : 'bg-purple-500'}`}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.5, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
}
