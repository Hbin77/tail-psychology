'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-md mx-auto w-full flex flex-col items-center text-center gap-6">
        {/* 꼬리 흔드는 애니메이션 */}
        <motion.div
          animate={{ rotate: [0, 20, -20, 20, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          className="text-7xl"
        >
          🐾
        </motion.div>

        {/* 로고 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black text-amber-900"
        >
          꼬리심리학
        </motion.h1>

        {/* 서브타이틀 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-amber-700 font-medium"
        >
          우리 아이 꼬리가 말해주는 진짜 성격
        </motion.p>

        {/* 설명 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-amber-600/80 leading-relaxed"
        >
          13개의 질문으로 알아보는<br />
          우리 반려동물의 MBTI 성격 유형 검사
        </motion.p>

        {/* CTA 버튼 */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/select')}
          className="mt-4 w-full h-14 bg-amber-500 hover:bg-amber-600 text-white text-lg font-bold rounded-2xl shadow-lg shadow-amber-500/30 transition-colors"
        >
          시작하기 🐾
        </motion.button>

        {/* 하단 텍스트 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-amber-400 mt-2"
        >
          AI가 분석하는 반려동물 성격 유형 검사
        </motion.p>
      </div>
    </div>
  );
}
