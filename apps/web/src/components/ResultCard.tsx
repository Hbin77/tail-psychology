'use client';

// Inline styles are used intentionally for html2canvas compatibility
import { forwardRef } from 'react';

interface ResultCardProps {
  petName: string;
  petCategory: 'dog' | 'cat';
  typeCode: string;
  characterName: string;
  description: string;
  axisScores: {
    extraversion: number;
    amicability: number;
    neuroticism: number;
    trainability?: number;
    dominance?: number;
  };
}

const dogAxisLabels: [string, string, string][] = [
  ['extraversion', '내향 (I)', '외향 (E)'],
  ['amicability', '독립 (R)', '친화 (A)'],
  ['neuroticism', '안정 (C)', '민감 (S)'],
  ['trainability', '자유 (F)', '순응 (T)'],
];

const catAxisLabels: [string, string, string][] = [
  ['extraversion', '내향 (I)', '외향 (E)'],
  ['amicability', '독립 (R)', '친화 (A)'],
  ['neuroticism', '안정 (C)', '민감 (S)'],
  ['dominance', '수동 (P)', '지배 (D)'],
];

function StaticScoreBar({ value, leftLabel, rightLabel, color }: {
  value: number; leftLabel: string; rightLabel: string; color: string;
}) {
  const percent = ((value + 1) / 2) * 100;

  return (
    <div style={{ width: '100%', marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#6B7280', marginBottom: 10 }}>
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div style={{ width: '100%', height: 24, backgroundColor: '#E5E7EB', borderRadius: 12, position: 'relative', overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', borderRadius: 12, backgroundColor: color }} />
        <div style={{ position: 'absolute', top: 0, left: '50%', width: 2, height: '100%', backgroundColor: '#D1D5DB' }} />
      </div>
    </div>
  );
}

function truncateDescription(text: string, maxLen: number = 120): string {
  if (!text) return '';
  const clean = text.replace(/\n/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).replace(/[,.\s]+$/, '') + '...';
}

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(
  ({ petName, petCategory, typeCode, characterName, description, axisScores }, ref) => {
    const isDog = petCategory === 'dog';
    const accentColor = isDog ? '#C4824E' : '#7C6B9E';
    const bgColor = isDog ? '#FDF6F0' : '#F5F0FA';
    const badgeBorder = isDog ? '#E8D5C4' : '#D4C8E8';
    const axisLabels = isDog ? dogAxisLabels : catAxisLabels;
    const shortDesc = truncateDescription(description);

    return (
      <div
        ref={ref}
        style={{
          position: 'fixed',
          left: -9999,
          top: 0,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: 1080,
            height: 1920,
            backgroundColor: bgColor,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '80px 80px 60px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            boxSizing: 'border-box',
          }}
        >
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/favicon.png"
            alt=""
            width={140}
            height={140}
            style={{ marginBottom: 16 }}
          />
          <div style={{ fontSize: 32, fontWeight: 700, color: accentColor, marginBottom: 60 }}>
            꼬리심리학
          </div>

          {/* Pet name */}
          <div style={{ fontSize: 36, color: '#6B7280', marginBottom: 20 }}>
            {petName}의 성격 유형은
          </div>

          {/* Character name */}
          <div style={{ fontSize: 96, fontWeight: 900, color: accentColor, marginBottom: 24 }}>
            {characterName}
          </div>

          {/* Type code badge */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: 10,
              color: accentColor,
              backgroundColor: 'rgba(255,255,255,0.6)',
              border: `3px solid ${badgeBorder}`,
              borderRadius: 44,
              padding: '16px 52px',
              marginBottom: 48,
            }}
          >
            {typeCode}
          </div>

          {/* Description */}
          {shortDesc && (
            <div style={{
              width: '100%',
              fontSize: 30,
              lineHeight: 1.8,
              color: '#4B5563',
              textAlign: 'center',
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderRadius: 24,
              padding: '36px 40px',
              marginBottom: 48,
            }}>
              {shortDesc}
            </div>
          )}

          {/* Score bars */}
          <div style={{ width: '100%', padding: '44px 48px 16px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 32, marginBottom: 0 }}>
            <div style={{ textAlign: 'center', fontSize: 26, fontWeight: 700, color: '#6B7280', marginBottom: 32 }}>
              성격 분석 차트
            </div>
            {axisLabels.map(([axis, left, right]) => (
              <StaticScoreBar
                key={axis}
                value={axisScores[axis as keyof typeof axisScores] ?? 0}
                leftLabel={left}
                rightLabel={right}
                color={accentColor}
              />
            ))}
          </div>

          {/* Watermark */}
          <div style={{ fontSize: 24, color: '#9CA3AF', textAlign: 'center', marginTop: 60 }}>
            {isDog ? '강아지' : '고양이'} 성격 유형 검사
          </div>
          <div style={{ fontSize: 22, color: '#D1D5DB', marginTop: 8 }}>
            꼬리심리학 | tailpsych.com
          </div>
        </div>
      </div>
    );
  }
);

ResultCard.displayName = 'ResultCard';

export default ResultCard;
