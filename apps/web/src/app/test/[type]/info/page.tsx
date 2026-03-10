'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { useTestStore } from '@/stores/useTestStore';
import { createSession } from '@/lib/api';
import { PawPrint, ChevronDown, Search, Check } from 'lucide-react';

const DOG_BREEDS = [
  '모르겠어요 / 믹스',
  '골든 리트리버', '래브라도 리트리버', '저먼 셰퍼드', '불독', '프렌치 불독',
  '비글', '푸들', '요크셔 테리어', '닥스훈트', '시바 이누',
  '포메라니안', '치와와', '시추', '말티즈', '코커 스패니얼',
  '보더 콜리', '허스키', '사모예드', '웰시 코기', '미니어처 슈나우저',
  '진돗개', '풍산개', '삽살개', '비숑 프리제', '도베르만',
  '그레이트 데인', '보스턴 테리어', '잭 러셀 테리어', '파피용', '페키니즈',
  '미니어처 핀셔', '캐벌리어 킹 찰스', '셔틀랜드 쉽독', '오스트레일리안 셰퍼드',
];

const CAT_BREEDS = [
  '모르겠어요 / 믹스',
  '코리안 숏헤어', '페르시안', '러시안 블루', '브리티시 숏헤어', '스코티시 폴드',
  '샴', '메인쿤', '랙돌', '아비시니안', '벵갈',
  '노르웨이 숲', '터키시 앙고라', '먼치킨', '아메리칸 숏헤어', '버만',
  '데본 렉스', '소말리', '이집션 마우', '오시캣', '싱가푸라',
  '통키니즈', '하바나 브라운', '발리니즈', '셀커크 렉스',
];

export default function InfoPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as 'dog' | 'cat';
  const { setPetName, setPetBreed, setSessionId } = useTestStore();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [breedSearch, setBreedSearch] = useState('');
  const [showBreedList, setShowBreedList] = useState(false);
  const [loading, setLoading] = useState(false);

  const isDog = type === 'dog';
  const breeds = isDog ? DOG_BREEDS : CAT_BREEDS;

  const filteredBreeds = useMemo(() => {
    if (!breedSearch) return breeds;
    return breeds.filter(b => b.includes(breedSearch));
  }, [breeds, breedSearch]);

  const handleBreedSelect = (selected: string) => {
    setBreed(selected);
    setBreedSearch('');
    setShowBreedList(false);
  };

  const handleNext = async () => {
    if (!name.trim() || loading) return;
    setLoading(true);
    setPetName(name.trim());
    setPetBreed(breed === '모르겠어요 / 믹스' ? '' : breed);

    try {
      const session = await createSession(type, name.trim(), breed === '모르겠어요 / 믹스' ? undefined : breed);
      setSessionId(session.id);
    } catch {
      setSessionId('offline-' + Date.now());
    }

    router.push(`/test/${type}/questions`);
  };

  const primaryColor = isDog ? '#C4824E' : '#7C6B9E';
  const borderColor = isDog ? '#E8D5C4' : '#D4C8E8';
  const hoverColor = isDog ? '#B3743F' : '#6B5A8D';

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto w-full flex flex-col items-center gap-5"
      >
        <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <PawPrint className="w-14 h-14" style={{ color: primaryColor }} strokeWidth={1.5} />
        </motion.div>

        <h1 className="text-2xl font-bold text-[#1A1A1A]">
          {isDog ? '강아지' : '고양이'} 정보
        </h1>

        {/* Name input */}
        <div className="w-full">
          <label className="text-sm font-medium text-[#6B7280] mb-1.5 block">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isDog ? '예: 초코' : '예: 나비'}
            maxLength={20}
            className="w-full h-12 px-4 text-base bg-white rounded-xl border focus:outline-none shadow-sm placeholder:text-[#9CA3AF]"
            style={{ borderColor: borderColor }}
            onFocus={(e) => e.target.style.borderColor = primaryColor}
            onBlur={(e) => e.target.style.borderColor = borderColor}
            autoFocus
          />
        </div>

        {/* Breed selector */}
        <div className="w-full relative">
          <label className="text-sm font-medium text-[#6B7280] mb-1.5 block">품종</label>
          <button
            type="button"
            onClick={() => setShowBreedList(!showBreedList)}
            className="w-full h-12 px-4 text-left bg-white rounded-xl border shadow-sm flex items-center justify-between"
            style={{ borderColor: showBreedList ? primaryColor : borderColor }}
          >
            <span className={breed ? 'text-[#1A1A1A]' : 'text-[#9CA3AF]'}>
              {breed || '품종을 선택해주세요'}
            </span>
            <ChevronDown className={`w-4 h-4 text-[#9CA3AF] transition-transform ${showBreedList ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showBreedList && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute z-10 w-full mt-1 bg-white rounded-xl border shadow-lg overflow-hidden"
                style={{ borderColor: borderColor }}
              >
                {/* Search input inside dropdown */}
                <div className="p-2 border-b" style={{ borderColor: borderColor }}>
                  <div className="flex items-center gap-2 px-3 h-9 bg-[#F5F5F3] rounded-lg">
                    <Search className="w-4 h-4 text-[#9CA3AF]" />
                    <input
                      type="text"
                      value={breedSearch}
                      onChange={(e) => setBreedSearch(e.target.value)}
                      placeholder="품종 검색..."
                      className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-[#9CA3AF]"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Breed list */}
                <div className="max-h-48 overflow-y-auto">
                  {filteredBreeds.map((b) => (
                    <button
                      key={b}
                      onClick={() => handleBreedSelect(b)}
                      className="w-full px-4 py-2.5 text-sm text-left hover:bg-[#F5F5F3] flex items-center justify-between transition-colors"
                    >
                      <span className={b === breed ? 'font-medium' : ''}>{b}</span>
                      {b === breed && <Check className="w-4 h-4" style={{ color: primaryColor }} />}
                    </button>
                  ))}
                  {filteredBreeds.length === 0 && (
                    <p className="px-4 py-3 text-sm text-[#9CA3AF]">검색 결과가 없습니다</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Next button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          disabled={!name.trim() || loading}
          className="w-full h-14 text-white text-lg font-bold rounded-xl shadow-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          style={{ backgroundColor: primaryColor }}
          onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = hoverColor}
          onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = primaryColor}
        >
          {loading ? '준비 중...' : '다음'}
        </motion.button>

        <p className="text-xs text-[#9CA3AF]">품종 선택은 선택사항입니다</p>
      </motion.div>
    </div>
  );
}
