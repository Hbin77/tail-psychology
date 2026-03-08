'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { getResult } from '@/lib/api';
import { DOG_TYPES, CAT_TYPES } from '@/data/questions';

interface ResultData {
  pet_name: string;
  pet_category: string;
  type_code: string;
  character_name: string;
  character_emoji: string;
  description: string;
  ai_description?: string;
  compatible_type: string;
  scores: {
    energy: number;
    social: number;
    sensitivity: number;
    curiosity: number;
  };
}

const axisLabels: Record<string, [string, string]> = {
  energy: ['느긋 (C)', '활발 (A)'],
  social: ['마이웨이 (M)', '사교적 (S)'],
  sensitivity: ['담대 (B)', '섬세 (D)'],
  curiosity: ['안전 (H)', '탐험 (E)'],
};

function ScoreBar({ label, value, leftLabel, rightLabel, color }: {
  label: string; value: number; leftLabel: string; rightLabel: string; color: string;
}) {
  // value: -1 ~ 1 -> 0% ~ 100%
  const percent = ((value + 1) / 2) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
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
        {/* 중앙선 */}
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-300" />
      </div>
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const params = useParams();
  const shareToken = params.id as string;
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      try {
        const data = await getResult(shareToken);
        setResult(data);
      } catch {
        // 데모/오프라인 모드 - 랜덤 결과 표시
        const types = [...DOG_TYPES, ...CAT_TYPES];
        const randomType = types[Math.floor(Math.random() * types.length)];
        setResult({
          pet_name: '우리 아이',
          pet_category: randomType.category,
          type_code: randomType.code,
          character_name: randomType.characterName,
          character_emoji: randomType.characterEmoji,
          description: randomType.description,
          compatible_type: randomType.compatibleType,
          scores: {
            energy: Math.random() * 2 - 1,
            social: Math.random() * 2 - 1,
            sensitivity: Math.random() * 2 - 1,
            curiosity: Math.random() * 2 - 1,
          },
        });
      } finally {
        setLoading(false);
      }
    }
    fetchResult();
  }, [shareToken]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: '꼬리심리학 결과', url });
      } catch { /* 사용자 취소 */ }
    } else {
      await navigator.clipboard.writeText(url);
      alert('링크가 복사되었습니다!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-4xl"
        >
          🐾
        </motion.div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-500 mb-4">결과를 찾을 수 없습니다</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 h-12 bg-amber-500 text-white rounded-2xl font-bold"
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

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-8 px-4">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-md mx-auto w-full flex flex-col items-center gap-6"
      >
        {/* 캐릭터 이모지 */}
        <motion.div variants={fadeUp} className="text-8xl">
          {result.character_emoji}
        </motion.div>

        {/* 이름 + 캐릭터 이름 */}
        <motion.div variants={fadeUp} className="text-center">
          <p className="text-sm text-gray-500 mb-1">{result.pet_name}의 성격 유형은</p>
          <h1 className={`text-3xl font-black ${isDog ? 'text-amber-900' : 'text-purple-900'}`}>
            {result.character_name}
          </h1>
        </motion.div>

        {/* 유형 코드 배지 */}
        <motion.div
          variants={fadeUp}
          className={`px-6 py-2 rounded-full text-lg font-bold tracking-widest ${
            isDog
              ? 'bg-amber-100 text-amber-700 border border-amber-300'
              : 'bg-purple-100 text-purple-700 border border-purple-300'
          }`}
        >
          {result.type_code}
        </motion.div>

        {/* 4축 점수 바 */}
        <motion.div variants={fadeUp} className="w-full bg-white rounded-3xl shadow-lg p-6 flex flex-col gap-5">
          <h3 className="text-sm font-bold text-gray-600 text-center">성격 분석 차트</h3>
          {Object.entries(axisLabels).map(([axis, [left, right]]) => (
            <ScoreBar
              key={axis}
              label={axis}
              value={result.scores[axis as keyof typeof result.scores]}
              leftLabel={left}
              rightLabel={right}
              color={isDog ? 'bg-amber-500' : 'bg-purple-500'}
            />
          ))}
        </motion.div>

        {/* 성격 설명 */}
        <motion.div variants={fadeUp} className="w-full bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-sm font-bold text-gray-600 mb-3">성격 설명</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {result.ai_description || result.description}
          </p>
        </motion.div>

        {/* 궁합 유형 */}
        {compatibleType && (
          <motion.div variants={fadeUp} className="w-full bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-sm font-bold text-gray-600 mb-3">💕 찰떡궁합 유형</h3>
            <div className="flex items-center gap-4">
              <span className="text-4xl">{compatibleType.characterEmoji}</span>
              <div>
                <p className={`font-bold ${isDog ? 'text-amber-800' : 'text-purple-800'}`}>
                  {compatibleType.characterName}
                </p>
                <p className="text-xs text-gray-500">{compatibleType.code}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 공유 버튼 */}
        <motion.div variants={fadeUp} className="w-full flex flex-col gap-3">
          <button
            onClick={handleShare}
            className={`w-full h-14 text-white text-lg font-bold rounded-2xl shadow-lg ${
              isDog
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30'
                : 'bg-purple-500 hover:bg-purple-600 shadow-purple-500/30'
            }`}
          >
            결과 공유하기 📤
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full h-14 bg-white text-gray-600 text-base font-bold rounded-2xl border-2 border-gray-200 hover:border-gray-300"
          >
            다른 친구도 테스트하기 🐾
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
