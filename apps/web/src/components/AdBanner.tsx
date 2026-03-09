'use client';

import { useEffect, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';

interface AdBannerProps {
  petCategory: 'dog' | 'cat';
}

// 쿠팡 파트너스 배너 HTML을 여기에 붙여넣기
// 가입: https://partners.coupang.com
// 배너 생성 후 아래 COUPANG_BANNER_HTML에 붙여넣기
const COUPANG_BANNER_HTML = process.env.NEXT_PUBLIC_COUPANG_BANNER || '';

// 쿠팡 파트너스 다이나믹 배너 스크립트 URL (카테고리별)
const COUPANG_DYNAMIC_URLS: Record<string, string> = {
  dog: process.env.NEXT_PUBLIC_COUPANG_DOG_URL || '',
  cat: process.env.NEXT_PUBLIC_COUPANG_CAT_URL || '',
};

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
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 쿠팡 파트너스 배너 HTML 삽입
    if (bannerRef.current && COUPANG_BANNER_HTML) {
      bannerRef.current.innerHTML = COUPANG_BANNER_HTML;

      // 스크립트 태그 실행
      const scripts = bannerRef.current.querySelectorAll('script');
      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    }
  }, []);

  const isDog = petCategory === 'dog';
  const primaryColor = isDog ? '#C4824E' : '#7C6B9E';
  const bgColor = isDog ? '#FDF6F0' : '#F5F0FA';
  const borderColor = isDog ? '#E8D5C4' : '#D4C8E8';
  const links = PRODUCT_LINKS[petCategory] || [];
  const hasAnyContent = COUPANG_BANNER_HTML || links.some(l => l.url !== '#');

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

      {/* 쿠팡 배너 삽입 영역 */}
      {COUPANG_BANNER_HTML && (
        <div ref={bannerRef} className="w-full overflow-hidden rounded-lg" />
      )}

      {/* 텍스트 링크 */}
      {links.some(l => l.url !== '#') && (
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
      )}

      <p className="text-[10px] text-[#9CA3AF] text-center">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </div>
  );
}
