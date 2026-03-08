'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { useTestStore } from '@/stores/useTestStore';
import { createSession } from '@/lib/api';

export default function InfoPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as 'dog' | 'cat';
  const { setPetName, setSessionId } = useTestStore();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const isDog = type === 'dog';
  const emoji = isDog ? '🐶' : '🐱';
  const accentColor = isDog ? 'amber' : 'purple';

  const handleNext = async () => {
    if (!name.trim() || loading) return;
    setLoading(true);
    setPetName(name.trim());

    try {
      const session = await createSession(type, name.trim());
      setSessionId(session.session_id);
    } catch {
      // MVP: API 실패해도 진행 (오프라인 모드)
      setSessionId('offline-' + Date.now());
    }

    router.push(`/test/${type}/questions`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto w-full flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-7xl"
        >
          {emoji}
        </motion.div>

        <h1 className={`text-2xl font-bold text-${accentColor}-900`}>
          이름을 알려주세요
        </h1>

        <p className={`text-sm text-${accentColor}-600`}>
          {isDog ? '우리 강아지' : '우리 고양이'}의 이름은 무엇인가요?
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleNext()}
          placeholder="예: 초코"
          maxLength={20}
          className={`w-full h-14 px-6 text-lg text-center bg-white rounded-2xl border-2 border-${accentColor}-200 focus:border-${accentColor}-400 focus:outline-none shadow-sm placeholder:text-gray-300`}
          autoFocus
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          disabled={!name.trim() || loading}
          className={`w-full h-14 text-white text-lg font-bold rounded-2xl shadow-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
            isDog
              ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30'
              : 'bg-purple-500 hover:bg-purple-600 shadow-purple-500/30'
          }`}
        >
          {loading ? '준비 중...' : '다음'}
        </motion.button>
      </motion.div>
    </div>
  );
}
