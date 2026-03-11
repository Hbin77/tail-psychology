'use client';

// Inline styles are used intentionally for html2canvas compatibility
import { forwardRef } from 'react';

interface ResultCardProps {
  petName: string;
  petCategory: 'dog' | 'cat';
  typeCode: string;
  characterName: string;
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
    <div style={{ width: '100%', marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#6B7280', marginBottom: 8 }}>
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div style={{ width: '100%', height: 20, backgroundColor: '#E5E7EB', borderRadius: 10, position: 'relative', overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', borderRadius: 10, backgroundColor: color }} />
        <div style={{ position: 'absolute', top: 0, left: '50%', width: 2, height: '100%', backgroundColor: '#D1D5DB' }} />
      </div>
    </div>
  );
}

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(
  ({ petName, petCategory, typeCode, characterName, axisScores }, ref) => {
    const isDog = petCategory === 'dog';
    const accentColor = isDog ? '#C4824E' : '#7C6B9E';
    const bgColor = isDog ? '#FDF6F0' : '#F5F0FA';
    const badgeBorder = isDog ? '#E8D5C4' : '#D4C8E8';
    const axisLabels = isDog ? dogAxisLabels : catAxisLabels;

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
            justifyContent: 'center',
            padding: 80,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            boxSizing: 'border-box',
          }}
        >
          {/* Brand */}
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            {/* Paw print SVG inline */}
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', margin: '0 auto 16px' }}>
              <circle cx="11" cy="4" r="2" />
              <circle cx="4.5" cy="9" r="2" />
              <circle cx="17.5" cy="9" r="2" />
              <path d="M12 18c4 0 6.5-3 6.5-6.5S14 5 12 5s-4.5 3-4.5 6.5S8 18 12 18z" />
            </svg>
            <div style={{ fontSize: 28, color: '#9CA3AF', letterSpacing: 4 }}>꼬리심리학</div>
          </div>

          {/* Pet name */}
          <div style={{ fontSize: 32, color: '#6B7280', marginBottom: 16 }}>
            {petName}의 성격 유형은
          </div>

          {/* Character name */}
          <div style={{ fontSize: 72, fontWeight: 900, color: accentColor, marginBottom: 24 }}>
            {characterName}
          </div>

          {/* Type code badge */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              letterSpacing: 12,
              color: accentColor,
              backgroundColor: 'rgba(255,255,255,0.6)',
              border: `3px solid ${badgeBorder}`,
              borderRadius: 40,
              padding: '16px 48px',
              marginBottom: 60,
            }}
          >
            {typeCode}
          </div>

          {/* Score bars */}
          <div style={{ width: '100%', padding: '48px 40px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 32, marginBottom: 60 }}>
            <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, color: '#6B7280', marginBottom: 32 }}>
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
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, color: '#9CA3AF', marginBottom: 8 }}>
              {isDog ? '강아지' : '고양이'} 성격 유형 검사
            </div>
            <div style={{ fontSize: 20, color: '#D1D5DB' }}>
              꼬리심리학 | tail-psychology
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ResultCard.displayName = 'ResultCard';

export default ResultCard;
