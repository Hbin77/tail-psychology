'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { useTestStore } from '@/stores/useTestStore';
import { CheckCircle2, Circle, Loader2, PawPrint } from 'lucide-react';

const steps = [
  { text: '행동 패턴 분석', delay: 800 },
  { text: '성격 유형 매칭', delay: 1600 },
  { text: '맞춤 설명 생성', delay: 2400 },
];

export default function LoadingPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as string;
  if (type !== 'dog' && type !== 'cat') {
    router.replace('/select');
    return null;
  }
  const { shareToken } = useTestStore();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const isDog = type === 'dog';

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((step, idx) => {
      timers.push(setTimeout(() => {
        setCompletedSteps((prev) => [...prev, idx]);
      }, step.delay));
    });

    timers.push(setTimeout(() => {
      if (shareToken) {
        router.replace(`/result/${shareToken}`);
      } else {
        router.replace('/');
      }
    }, 3500));

    return () => timers.forEach(clearTimeout);
  }, [router, shareToken]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center px-6">
      <div className="max-w-md mx-auto w-full flex flex-col items-center gap-8">
        <motion.div
          animate={{ rotate: [0, 15, -15, 15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <PawPrint
            className={`w-20 h-20 ${isDog ? 'text-[#C4824E]' : 'text-[#7C6B9E]'}`}
            strokeWidth={1.5}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold text-[#1A1A1A]"
        >
          꼬리 심리 분석 중...
        </motion.h2>

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
                {isCompleted ? (
                  <CheckCircle2 className={`w-5 h-5 ${isDog ? 'text-[#C4824E]' : 'text-[#7C6B9E]'}`} />
                ) : isActive ? (
                  <Loader2 className={`w-5 h-5 animate-spin ${isDog ? 'text-[#C4824E]' : 'text-[#7C6B9E]'}`} />
                ) : (
                  <Circle className="w-5 h-5 text-[#9CA3AF]" />
                )}
                <span
                  className={`text-base font-medium ${
                    isCompleted ? 'text-[#1A1A1A]' : 'text-[#9CA3AF]'
                  }`}
                >
                  {step.text}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${isDog ? 'bg-[#C4824E]' : 'bg-[#7C6B9E]'}`}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.5, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
}
