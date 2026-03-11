'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { getResult } from '@/lib/api';
import { DOG_TYPES, CAT_TYPES } from '@/data/questions';
import { Share2, PawPrint, Heart, Loader2 } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import KakaoAdFit from '@/components/KakaoAdFit';
import GoogleAdSense from '@/components/GoogleAdSense';
import ResultCard from '@/components/ResultCard';
import ShareSheet from '@/components/ShareSheet';
import { useCardImage } from '@/hooks/useCardImage';

interface ResultData {
  pet_name: string;
  pet_category: string;
  type_code: string;
  character_name: string;
  ai_description: string;
  ai_compatibility: string;
  compatible_type: string | null;
  axis_scores: {
    extraversion: number;
    amicability: number;
    neuroticism: number;
    trainability?: number;
    dominance?: number;
  };
}

const dogAxisLabels: Record<string, [string, string]> = {
  extraversion: ['내향 (I)', '외향 (E)'],
  amicability: ['독립 (R)', '친화 (A)'],
  neuroticism: ['안정 (C)', '민감 (S)'],
  trainability: ['자유 (F)', '순응 (T)'],
};

const catAxisLabels: Record<string, [string, string]> = {
  extraversion: ['내향 (I)', '외향 (E)'],
  amicability: ['독립 (R)', '친화 (A)'],
  neuroticism: ['안정 (C)', '민감 (S)'],
  dominance: ['수동 (P)', '지배 (D)'],
};

function ScoreBar({ value, leftLabel, rightLabel, color }: {
  value: number; leftLabel: string; rightLabel: string; color: string;
}) {
  const percent = ((value + 1) / 2) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-[#6B7280] mb-1">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: '50%' }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`h-full rounded-full ${color}`}
        />
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-300" />
      </div>
    </div>
  );
}

function lookupType(typeCode: string, petCategory: string) {
  const types = petCategory === 'dog' ? DOG_TYPES : CAT_TYPES;
  return types.find((t) => t.code === typeCode);
}

export default function ResultPage() {
  const router = useRouter();
  const params = useParams();
  const shareToken = params.id as string;
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareSheetOpen, setShareSheetOpen] = useState(false);
  const { cardRef, isGenerating, handleSaveImage, handleShareImage, handleShareLink } = useCardImage();

  useEffect(() => {
    async function fetchResult() {
      try {
        const data = await getResult(shareToken);
        // 백엔드 응답에 character_name이 없으면 로컬 타입 데이터에서 조회
        const localType = lookupType(data.type_code, data.pet_category);
        setResult({
          pet_name: data.pet_name,
          pet_category: data.pet_category,
          type_code: data.type_code,
          character_name: data.character_name || localType?.characterName || data.type_code,
          ai_description: data.ai_description || localType?.description || '',
          ai_compatibility: data.ai_compatibility || '',
          compatible_type: data.compatible_type || localType?.compatibleType || null,
          axis_scores: data.axis_scores,
        });
      } catch {
        // 데모/오프라인 모드
        const types = [...DOG_TYPES, ...CAT_TYPES];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const isCat = randomType.category === 'cat';
        setResult({
          pet_name: '우리 아이',
          pet_category: randomType.category,
          type_code: randomType.code,
          character_name: randomType.characterName,
          ai_description: randomType.description,
          ai_compatibility: '',
          compatible_type: randomType.compatibleType,
          axis_scores: {
            extraversion: Math.random() * 2 - 1,
            amicability: Math.random() * 2 - 1,
            neuroticism: Math.random() * 2 - 1,
            ...(isCat
              ? { dominance: Math.random() * 2 - 1 }
              : { trainability: Math.random() * 2 - 1 }),
          },
        });
      } finally {
        setLoading(false);
      }
    }
    fetchResult();
  }, [shareToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#C4824E] animate-spin" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[#6B7280] mb-4">결과를 찾을 수 없습니다</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 h-12 bg-[#C4824E] text-white rounded-xl font-bold"
          >
            처음으로
          </button>
        </div>
      </div>
    );
  }

  const isDog = result.pet_category === 'dog';
  const compatibleTypes = isDog ? DOG_TYPES : CAT_TYPES;
  const compatibleType = compatibleTypes.find((t) => t.code === result.compatible_type);
  const axisLabels = isDog ? dogAxisLabels : catAxisLabels;

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-8 px-4">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-md mx-auto w-full flex flex-col items-center gap-6"
      >
        <motion.div variants={fadeUp}>
          <PawPrint
            className={`w-20 h-20 ${isDog ? 'text-[#C4824E]' : 'text-[#7C6B9E]'}`}
            strokeWidth={1.5}
          />
        </motion.div>

        <motion.div variants={fadeUp} className="text-center">
          <p className="text-sm text-[#6B7280] mb-1">{result.pet_name}의 성격 유형은</p>
          <h1 className={`text-3xl font-black ${isDog ? 'text-[#C4824E]' : 'text-[#7C6B9E]'}`}>
            {result.character_name}
          </h1>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className={`px-6 py-2 rounded-full text-lg font-bold tracking-widest ${
            isDog
              ? 'bg-[#FDF6F0] text-[#C4824E] border border-[#E8D5C4]'
              : 'bg-[#F5F0FA] text-[#7C6B9E] border border-[#D4C8E8]'
          }`}
        >
          {result.type_code}
        </motion.div>

        <motion.div variants={fadeUp} className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
          <h3 className="text-sm font-bold text-[#6B7280] text-center">성격 분석 차트</h3>
          {Object.entries(axisLabels).map(([axis, [left, right]]) => (
            <ScoreBar
              key={axis}
              value={result.axis_scores[axis as keyof typeof result.axis_scores] ?? 0}
              leftLabel={left}
              rightLabel={right}
              color={isDog ? 'bg-[#C4824E]' : 'bg-[#7C6B9E]'}
            />
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-[#6B7280] mb-3">성격 설명</h3>
          <p className="text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-line">
            {result.ai_description}
          </p>
        </motion.div>

        {result.ai_compatibility && (
          <motion.div variants={fadeUp} className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-[#6B7280] mb-3">보호자 궁합</h3>
            <p className="text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-line">
              {result.ai_compatibility}
            </p>
          </motion.div>
        )}

        {compatibleType && (
          <motion.div variants={fadeUp} className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-[#6B7280] mb-3 flex items-center gap-1.5">
              <Heart className="w-4 h-4" />
              찰떡궁합 유형
            </h3>
            <div className="flex items-center gap-4">
              <PawPrint className={`w-10 h-10 ${isDog ? 'text-[#C4824E]' : 'text-[#7C6B9E]'}`} strokeWidth={1.5} />
              <div>
                <p className={`font-bold ${isDog ? 'text-[#C4824E]' : 'text-[#7C6B9E]'}`}>
                  {compatibleType.characterName}
                </p>
                <p className="text-xs text-[#9CA3AF]">{compatibleType.code}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 카카오 애드핏 */}
        {process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT_ID && (
          <motion.div variants={fadeUp} className="w-full flex justify-center">
            <KakaoAdFit unitId={process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT_ID} />
          </motion.div>
        )}

        {/* 구글 애드센스 */}
        {process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT && (
          <motion.div variants={fadeUp} className="w-full">
            <GoogleAdSense adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT} />
          </motion.div>
        )}

        {/* 쿠팡 광고 배너 */}
        <motion.div variants={fadeUp} className="w-full">
          <AdBanner petCategory={isDog ? 'dog' : 'cat'} />
        </motion.div>

        <motion.div variants={fadeUp} className="w-full flex flex-col gap-3">
          <button
            onClick={() => setShareSheetOpen(true)}
            className={`w-full h-14 text-white text-lg font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 ${
              isDog
                ? 'bg-[#C4824E] hover:bg-[#B3743F]'
                : 'bg-[#7C6B9E] hover:bg-[#6B5A8D]'
            }`}
          >
            결과 공유하기
            <Share2 className="w-5 h-5" />
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full h-14 bg-white text-[#6B7280] text-base font-bold rounded-xl border border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2"
          >
            <PawPrint className="w-4 h-4" />
            다른 친구도 테스트하기
          </button>
        </motion.div>

        <motion.div variants={fadeUp} className="w-full text-center">
          <p className="text-[10px] text-[#9CA3AF] leading-relaxed">
            본 검사는 C-BARQ, Feline Five 등 학술 연구를 참고하여 만든 재미 목적의 성격 유형 검사이며,
            수의행동학적 진단을 대체하지 않습니다.
          </p>
        </motion.div>
      </motion.div>

      {/* 공유용 이미지 카드 (off-screen) */}
      <ResultCard
        ref={cardRef}
        petName={result.pet_name}
        petCategory={isDog ? 'dog' : 'cat'}
        typeCode={result.type_code}
        characterName={result.character_name}
        axisScores={result.axis_scores}
      />

      {/* 공유 바텀시트 */}
      <ShareSheet
        isOpen={shareSheetOpen}
        onClose={() => setShareSheetOpen(false)}
        onSaveImage={handleSaveImage}
        onShareImage={handleShareImage}
        onShareLink={handleShareLink}
        isGenerating={isGenerating}
        isDog={isDog}
      />
    </div>
  );
}
