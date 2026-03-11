'use client';

import { useRef, useState, useCallback } from 'react';
import html2canvas from 'html2canvas';

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function useCardImage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = useCallback(async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;

    try {
      await document.fonts.ready;

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });

      return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png');
      });
    } catch {
      return null;
    }
  }, []);

  const handleSaveImage = useCallback(async () => {
    setIsGenerating(true);
    try {
      const blob = await generateImage();
      if (!blob) {
        alert('이미지 생성에 실패했습니다. 다시 시도해주세요.');
        return;
      }
      downloadBlob(blob, 'tail-psychology-result.png');
    } finally {
      setIsGenerating(false);
    }
  }, [generateImage]);

  const handleShareImage = useCallback(async () => {
    setIsGenerating(true);
    try {
      const blob = await generateImage();
      if (!blob) {
        alert('이미지 생성에 실패했습니다. 다시 시도해주세요.');
        return;
      }

      const file = new File([blob], 'tail-psychology-result.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: '꼬리심리학 - 우리 아이 성격 유형',
          files: [file],
        });
      } else {
        // fallback: 이미지 다운로드
        downloadBlob(blob, 'tail-psychology-result.png');
      }
    } catch {
      // user cancelled share dialog
    } finally {
      setIsGenerating(false);
    }
  }, [generateImage]);

  const handleShareLink = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: '꼬리심리학 결과', url });
      } catch { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('링크가 복사되었습니다!');
      } catch {
        alert('링크 복사에 실패했습니다.');
      }
    }
  }, []);

  return {
    cardRef,
    isGenerating,
    handleSaveImage,
    handleShareImage,
    handleShareLink,
  };
}
