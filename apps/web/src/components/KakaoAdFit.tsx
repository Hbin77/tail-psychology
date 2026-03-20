'use client';

import { useEffect, useRef } from 'react';

interface KakaoAdFitProps {
  unitId: string;
  width?: number;
  height?: number;
}

export default function KakaoAdFit({ unitId, width = 320, height = 50 }: KakaoAdFitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    if (!containerRef.current) return;

    initialized.current = true;

    const ins = document.createElement('ins');
    ins.className = 'kakao_ad_area';
    ins.style.display = 'none';
    ins.setAttribute('data-ad-unit', unitId);
    ins.setAttribute('data-ad-width', String(width));
    ins.setAttribute('data-ad-height', String(height));

    containerRef.current.appendChild(ins);

    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      initialized.current = false;
    };
  }, [unitId, width, height]);

  if (!unitId) return null;

  return <div ref={containerRef} className="w-full flex justify-center" />;
}
