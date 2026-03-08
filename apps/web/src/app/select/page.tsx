'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/stores/useTestStore';
import { Dog, Cat } from 'lucide-react';

export default function SelectPage() {
  const router = useRouter();
  const { setPetType, reset } = useTestStore();

  const handleSelect = (type: 'dog' | 'cat') => {
    reset();
    setPetType(type);
    router.push(`/test/${type}/info`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center px-6">
      <div className="max-w-md mx-auto w-full flex flex-col items-center gap-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-[#1A1A1A]"
        >
          우리 아이는?
        </motion.h1>

        <div className="w-full flex flex-col gap-4">
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect('dog')}
            className="w-full p-8 bg-[#FDF6F0] rounded-2xl shadow-sm border border-[#E8D5C4] hover:border-[#C4824E] transition-colors"
          >
            <Dog className="w-14 h-14 text-[#C4824E] mx-auto mb-3" strokeWidth={1.5} />
            <div className="text-2xl font-bold text-[#C4824E]">강아지</div>
            <div className="text-sm text-[#6B7280] mt-1">강아지 성격 유형 검사</div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect('cat')}
            className="w-full p-8 bg-[#F5F0FA] rounded-2xl shadow-sm border border-[#D4C8E8] hover:border-[#7C6B9E] transition-colors"
          >
            <Cat className="w-14 h-14 text-[#7C6B9E] mx-auto mb-3" strokeWidth={1.5} />
            <div className="text-2xl font-bold text-[#7C6B9E]">고양이</div>
            <div className="text-sm text-[#6B7280] mt-1">고양이 성격 유형 검사</div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
