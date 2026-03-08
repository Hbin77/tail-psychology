'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/stores/useTestStore';

export default function SelectPage() {
  const router = useRouter();
  const { setPetType, reset } = useTestStore();

  const handleSelect = (type: 'dog' | 'cat') => {
    reset();
    setPetType(type);
    router.push(`/test/${type}/info`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-md mx-auto w-full flex flex-col items-center gap-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-amber-900"
        >
          우리 아이는?
        </motion.h1>

        <div className="w-full flex flex-col gap-4">
          {/* 강아지 카드 */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect('dog')}
            className="w-full p-8 bg-white rounded-3xl shadow-lg border-2 border-amber-200 hover:border-amber-400 transition-colors"
          >
            <div className="text-6xl mb-3">🐶</div>
            <div className="text-2xl font-bold text-amber-800">멍BTI</div>
            <div className="text-sm text-amber-600 mt-1">강아지 성격 유형 검사</div>
          </motion.button>

          {/* 고양이 카드 */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect('cat')}
            className="w-full p-8 bg-white rounded-3xl shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-colors"
          >
            <div className="text-6xl mb-3">🐱</div>
            <div className="text-2xl font-bold text-purple-800">냥BTI</div>
            <div className="text-sm text-purple-600 mt-1">고양이 성격 유형 검사</div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
