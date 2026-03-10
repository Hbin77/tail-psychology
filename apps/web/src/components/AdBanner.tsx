'use client';

import { ShoppingBag } from 'lucide-react';

interface AdBannerProps {
  petCategory: 'dog' | 'cat';
}

// 추천 상품 링크 (쿠팡 파트너스 링크)
const PRODUCT_LINKS: Record<string, { title: string; url: string }[]> = {
  dog: [
    { title: '강아지 장난감 베스트', url: process.env.NEXT_PUBLIC_COUPANG_DOG_TOY || '#' },
    { title: '사료/간식 인기상품', url: process.env.NEXT_PUBLIC_COUPANG_DOG_FOOD || '#' },
  ],
  cat: [
    { title: '고양이 장난감 베스트', url: process.env.NEXT_PUBLIC_COUPANG_CAT_TOY || '#' },
    { title: '사료/간식 인기상품', url: process.env.NEXT_PUBLIC_COUPANG_CAT_FOOD || '#' },
  ],
};

export default function AdBanner({ petCategory }: AdBannerProps) {
  const isDog = petCategory === 'dog';
  const primaryColor = isDog ? '#C4824E' : '#7C6B9E';
  const bgColor = isDog ? '#FDF6F0' : '#F5F0FA';
  const borderColor = isDog ? '#E8D5C4' : '#D4C8E8';
  const links = PRODUCT_LINKS[petCategory] || [];
  const hasAnyContent = links.some(l => l.url !== '#');

  if (!hasAnyContent) return null;

  return (
    <div
      className="w-full rounded-2xl border p-5 flex flex-col gap-3"
      style={{ backgroundColor: bgColor, borderColor }}
    >
      <h3 className="text-sm font-bold text-[#6B7280] flex items-center gap-1.5">
        <ShoppingBag className="w-4 h-4" />
        {isDog ? '강아지' : '고양이'} 추천 용품
      </h3>

      {/* 텍스트 링크 */}
      <div className="flex flex-col gap-2">
        {links.filter(l => l.url !== '#').map((link) => (
          <a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-sm font-medium px-4 py-2.5 rounded-xl bg-white border transition-colors hover:opacity-80 text-center"
            style={{ color: primaryColor, borderColor }}
          >
            {link.title}
          </a>
        ))}
      </div>

      <p className="text-[10px] text-[#9CA3AF] text-center">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </div>
  );
}
