'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PawPrint, ArrowRight } from 'lucide-react';
import KakaoAdFit from '@/components/KakaoAdFit';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center px-6">
      <div className="max-w-md mx-auto w-full flex flex-col items-center text-center gap-6">
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
        >
          <PawPrint className="w-16 h-16 text-[#C4824E]" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black text-[#1A1A1A]"
        >
          꼬리심리학
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-[#6B7280] font-medium"
        >
          학술 연구 기반 반려동물 성격 유형 검사
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-[#9CA3AF] leading-relaxed"
        >
          13개의 문항으로 알아보는<br />
          우리 아이의 행동 성격 유형
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push('/select')}
          className="mt-4 w-full h-14 bg-[#C4824E] hover:bg-[#B3743F] text-white text-lg font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
        >
          시작하기
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-[#9CA3AF] mt-2"
        >
          C-BARQ, Feline Five 등 동물행동학 연구 기반
        </motion.p>

        {process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT_ID && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="w-full flex justify-center mt-2"
          >
            <KakaoAdFit unitId={process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT_ID} />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex items-center gap-3 mt-4 text-xs text-[#9CA3AF]"
        >
          <Link href="/about" className="hover:text-[#6B7280] transition-colors">소개</Link>
          <span>|</span>
          <Link href="/types" className="hover:text-[#6B7280] transition-colors">유형 도감</Link>
          <span>|</span>
          <Link href="/privacy" className="hover:text-[#6B7280] transition-colors">개인정보처리방침</Link>
          <span>|</span>
          <Link href="/terms" className="hover:text-[#6B7280] transition-colors">이용약관</Link>
        </motion.div>
      </div>
    </div>
  );
}
