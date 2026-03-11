'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, Link, X, Loader2 } from 'lucide-react';

interface ShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveImage: () => void;
  onShareImage: () => void;
  onShareLink: () => void;
  isGenerating: boolean;
  isDog: boolean;
}

export default function ShareSheet({
  isOpen,
  onClose,
  onSaveImage,
  onShareImage,
  onShareLink,
  isGenerating,
  isDog,
}: ShareSheetProps) {
  const accentColor = isDog ? '#C4824E' : '#7C6B9E';
  const lightBg = isDog ? '#FDF6F0' : '#F5F0FA';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />

          {/* Sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="공유 옵션"
            onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[51] bg-white rounded-t-3xl px-6 pb-8 pt-4 max-w-md mx-auto"
          >
            {/* Handle */}
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[#1A1A1A]">공유하기</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            {isGenerating && (
              <div className="flex items-center justify-center gap-2 py-4 mb-4 rounded-xl" style={{ backgroundColor: lightBg }}>
                <Loader2 className="w-5 h-5 animate-spin" style={{ color: accentColor }} />
                <span className="text-sm font-medium" style={{ color: accentColor }}>이미지 생성 중...</span>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {/* 이미지로 저장 */}
              <button
                onClick={onSaveImage}
                disabled={isGenerating}
                className="w-full p-4 rounded-xl border border-gray-200 hover:border-gray-300 flex items-center gap-4 transition-colors disabled:opacity-50"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: lightBg }}>
                  <Download className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-[#1A1A1A]">이미지로 저장</p>
                  <p className="text-xs text-[#9CA3AF]">갤러리에 결과 카드를 저장합니다</p>
                </div>
              </button>

              {/* 이미지 공유 (인스타 등) */}
              <button
                onClick={onShareImage}
                disabled={isGenerating}
                className="w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-colors disabled:opacity-50"
                style={{ borderColor: accentColor, backgroundColor: lightBg }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'white' }}>
                  <Share2 className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold" style={{ color: accentColor }}>인스타/SNS에 공유</p>
                  <p className="text-xs text-[#9CA3AF]">스토리, 게시물에 바로 공유할 수 있어요</p>
                </div>
              </button>

              {/* 링크 공유 */}
              <button
                onClick={onShareLink}
                disabled={isGenerating}
                className="w-full p-4 rounded-xl border border-gray-200 hover:border-gray-300 flex items-center gap-4 transition-colors disabled:opacity-50"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100">
                  <Link className="w-6 h-6 text-[#6B7280]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-[#1A1A1A]">링크 공유</p>
                  <p className="text-xs text-[#9CA3AF]">결과 페이지 링크를 공유합니다</p>
                </div>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
