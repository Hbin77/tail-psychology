'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { useTestStore } from '@/stores/useTestStore';
import { createSession } from '@/lib/api';
import { PawPrint } from 'lucide-react';

export default function InfoPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as 'dog' | 'cat';
  const { setPetName, setSessionId } = useTestStore();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const isDog = type === 'dog';

  const handleNext = async () => {
    if (!name.trim() || loading) return;
    setLoading(true);
    setPetName(name.trim());

    try {
      const session = await createSession(type, name.trim());
      setSessionId(session.session_id);
    } catch {
      setSessionId('offline-' + Date.now());
    }

    router.push(`/test/${type}/questions`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto w-full flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <PawPrint
            className={`w-16 h-16 ${isDog ? 'text-[#C4824E]' : 'text-[#7C6B9E]'}`}
            strokeWidth={1.5}
          />
        </motion.div>

        <h1 className="text-2xl font-bold text-[#1A1A1A]">
          이름을 알려주세요
        </h1>

        <p className="text-sm text-[#6B7280]">
          {isDog ? '우리 강아지' : '우리 고양이'}의 이름은 무엇인가요?
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleNext()}
          placeholder="예: 초코"
          maxLength={20}
          className={`w-full h-14 px-6 text-lg text-center bg-white rounded-xl border ${
            isDog ? 'border-[#E8D5C4] focus:border-[#C4824E]' : 'border-[#D4C8E8] focus:border-[#7C6B9E]'
          } focus:outline-none shadow-sm placeholder:text-[#9CA3AF]`}
          autoFocus
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          disabled={!name.trim() || loading}
          className={`w-full h-14 text-white text-lg font-bold rounded-xl shadow-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
            isDog
              ? 'bg-[#C4824E] hover:bg-[#B3743F]'
              : 'bg-[#7C6B9E] hover:bg-[#6B5A8D]'
          }`}
        >
          {loading ? '준비 중...' : '다음'}
        </motion.button>
      </motion.div>
    </div>
  );
}
