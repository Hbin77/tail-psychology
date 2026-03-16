import type { Metadata } from 'next';
import Link from 'next/link';
import { DOG_TYPES, CAT_TYPES } from '@/data/questions';
import GoogleAdSense from '@/components/GoogleAdSense';
import KakaoAdFit from '@/components/KakaoAdFit';

export const metadata: Metadata = {
  title: '성격 유형 도감 | 꼬리심리학',
  description: '강아지 16가지, 고양이 16가지 성격 유형을 모두 확인해보세요. C-BARQ, Feline Five 학술 연구 기반 반려동물 성격 분류 시스템.',
};

const dogAxisExplain: Record<string, string> = {
  E: '외향적 (Extraverted) — 활발하고 새로운 자극을 즐기는',
  I: '내향적 (Introverted) — 차분하고 신중한',
  A: '친화적 (Amicable) — 사교적이고 다정한',
  R: '독립적 (Reserved) — 자기만의 공간을 중시하는',
  S: '민감한 (Sensitive) — 환경 변화에 예민한',
  C: '안정적 (Calm) — 웬만한 자극에도 흔들리지 않는',
  T: '순응적 (Trainable) — 보호자의 지시를 잘 따르는',
  F: '자유로운 (Free-spirited) — 자기 방식대로 행동하는',
};

const catAxisExplain: Record<string, string> = {
  E: '외향적 (Extraverted) — 활발하고 탐험적인',
  I: '내향적 (Introverted) — 조용하고 관찰하는',
  A: '친화적 (Amicable) — 사람과 동물에게 다정한',
  R: '독립적 (Reserved) — 혼자만의 시간을 선호하는',
  S: '민감한 (Sensitive) — 소리와 변화에 예민한',
  C: '안정적 (Calm) — 환경 변화에도 동요 없는',
  D: '지배적 (Dominant) — 영역과 주도권을 중시하는',
  P: '수동적 (Passive) — 순응적이고 평화로운',
};

function TypeCard({ code, name, description, axisExplain, accentColor, lightBg, borderColor }: {
  code: string; name: string; description: string;
  axisExplain: Record<string, string>;
  accentColor: string; lightBg: string; borderColor: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center gap-3 mb-3">
        <span
          className="text-sm font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: lightBg, color: accentColor, border: `1px solid ${borderColor}` }}
        >
          {code}
        </span>
        <h3 className="text-base font-bold" style={{ color: accentColor }}>{name}</h3>
      </div>
      <p className="text-sm text-[#4B5563] leading-relaxed mb-3">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {code.split('').map((letter, i) => (
          <span key={i} className="text-xs text-[#6B7280] bg-gray-50 px-2 py-0.5 rounded-md">
            {axisExplain[letter] || letter}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TypesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-[#9CA3AF] hover:text-[#6B7280] mb-8 inline-block">
          &larr; 홈으로 돌아가기
        </Link>

        <h1 className="text-2xl font-black text-[#1A1A1A] mb-2">성격 유형 도감</h1>
        <p className="text-[#6B7280] mb-4">
          꼬리심리학의 4축 성격 분석 시스템은 C-BARQ(Canine Behavioral Assessment and Research Questionnaire)와
          Feline Five 연구를 기반으로 강아지와 고양이 각각 16가지 성격 유형을 분류합니다.
        </p>
        <p className="text-sm text-[#9CA3AF] mb-8">
          각 유형은 외향성(E/I), 친화성(A/R), 신경성(S/C), 그리고 강아지는 순응성(T/F), 고양이는 지배성(D/P)의
          4가지 축 조합으로 결정됩니다. 같은 유형이라도 개체마다 성격의 강도는 다를 수 있습니다.
        </p>

        {/* 강아지 유형 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#C4824E] mb-2">강아지 성격 유형 (16가지)</h2>
          <p className="text-sm text-[#6B7280] mb-6">
            C-BARQ의 14개 하위 척도(Hsu &amp; Serpell, 2003)와 DPQ(Dog Personality Questionnaire, Gosling)를
            참고하여 설계된 강아지 성격 분류 체계입니다. 외향성, 친화성, 신경성, 순응성의 4축으로 구성됩니다.
          </p>
          <div className="flex flex-col gap-4">
            {DOG_TYPES.map((t) => (
              <TypeCard
                key={t.code}
                code={t.code}
                name={t.characterName}
                description={t.description}
                axisExplain={dogAxisExplain}
                accentColor="#C4824E"
                lightBg="#FDF6F0"
                borderColor="#E8D5C4"
              />
            ))}
          </div>
        </section>

        {/* 광고 - 콘텐츠 사이 자연스럽게 배치 */}
        {process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT_ID && (
          <div className="my-8 flex justify-center">
            <KakaoAdFit unitId={process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT_ID} />
          </div>
        )}
        {process.env.NEXT_PUBLIC_ADSENSE_SLOT_TYPES && (
          <div className="my-8">
            <GoogleAdSense adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TYPES} />
          </div>
        )}

        {/* 고양이 유형 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#7C6B9E] mb-2">고양이 성격 유형 (16가지)</h2>
          <p className="text-sm text-[#6B7280] mb-6">
            Feline Five(Litchfield et al., 2017)의 5요인 모델과 Fe-BARQ(Feline Behavioral Assessment and
            Research Questionnaire)를 참고하여 설계된 고양이 성격 분류 체계입니다. 외향성, 친화성, 신경성, 지배성의 4축으로 구성됩니다.
          </p>
          <div className="flex flex-col gap-4">
            {CAT_TYPES.map((t) => (
              <TypeCard
                key={t.code}
                code={t.code}
                name={t.characterName}
                description={t.description}
                axisExplain={catAxisExplain}
                accentColor="#7C6B9E"
                lightBg="#F5F0FA"
                borderColor="#D4C8E8"
              />
            ))}
          </div>
        </section>

        {/* 참고 문헌 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">참고 문헌</h2>
          <div className="text-xs text-[#6B7280] leading-relaxed flex flex-col gap-2">
            <p>Hsu, Y., &amp; Serpell, J. A. (2003). Development and validation of a questionnaire for measuring behavior and temperament traits in pet dogs. <em>Journal of the American Veterinary Medical Association</em>, 223(9), 1293-1300.</p>
            <p>Litchfield, C. A., Quinton, G., Tindle, H., Chiera, B., Kikillus, K. H., &amp; Roetman, P. (2017). The &apos;Feline Five&apos;: An exploration of personality in pet cats (Felis catus). <em>PLOS ONE</em>, 12(8), e0183455.</p>
            <p>Morrill, K., Hekman, J., Li, X., McClure, J., Logan, B., Goodman, L., ... &amp; Karlsson, E. K. (2022). Ancestry-inclusive dog genomics challenges popular breed stereotypes. <em>Science</em>, 376(6592), eabk0639.</p>
            <p>Gosling, S. D., &amp; John, O. P. (1999). Personality dimensions in nonhuman animals: A cross-species review. <em>Current Directions in Psychological Science</em>, 8(3), 69-75.</p>
          </div>
        </section>

        <section className="border-t border-gray-200 pt-6">
          <p className="text-xs text-[#9CA3AF]">
            본 유형 분류는 학술 연구를 참고하여 만든 재미 목적의 시스템이며, 수의행동학적 진단을 대체하지 않습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
