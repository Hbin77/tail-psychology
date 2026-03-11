import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '꼬리심리학 소개 | 반려동물 성격 유형 검사',
  description: '꼬리심리학은 C-BARQ, Feline Five 등 학술 연구를 기반으로 한 반려동물 성격 유형 검사 서비스입니다.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-[#9CA3AF] hover:text-[#6B7280] mb-8 inline-block">
          &larr; 홈으로 돌아가기
        </Link>

        <h1 className="text-2xl font-black text-[#1A1A1A] mb-2">꼬리심리학</h1>
        <p className="text-lg text-[#6B7280] mb-8">학술 연구 기반 반려동물 성격 유형 검사</p>

        <div className="prose prose-sm max-w-none text-[#4B5563] leading-relaxed flex flex-col gap-8">
          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">우리 아이의 진짜 성격, 알고 계신가요?</h2>
            <p>
              반려동물도 사람처럼 저마다 고유한 성격을 가지고 있습니다.
              같은 품종이라도 활발한 아이가 있고, 조용한 아이가 있습니다.
              사교적인 아이가 있고, 혼자만의 시간을 즐기는 아이가 있죠.
            </p>
            <p className="mt-3">
              꼬리심리학은 이런 반려동물의 다양한 성격을 <strong>4가지 축</strong>으로 분석하여,
              16가지 성격 유형 중 우리 아이에게 딱 맞는 유형을 찾아드립니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">학술 연구에 기반한 검사</h2>
            <p>꼬리심리학의 성격 유형 체계는 다음과 같은 동물행동학 연구를 참고하여 설계되었습니다.</p>
            <div className="mt-4 flex flex-col gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-bold text-[#C4824E] mb-1">C-BARQ (Canine Behavioral Assessment)</h3>
                <p className="text-xs text-[#6B7280]">Hsu & Serpell, 2003 - University of Pennsylvania</p>
                <p className="mt-2 text-sm">강아지의 행동과 기질을 14개 하위 척도로 평가하는 국제적으로 가장 널리 사용되는 표준화된 행동 평가 도구입니다.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-bold text-[#7C6B9E] mb-1">Feline Five (고양이 5요인 모델)</h3>
                <p className="text-xs text-[#6B7280]">Litchfield et al., 2017 - University of South Australia</p>
                <p className="mt-2 text-sm">2,802마리 고양이를 대상으로 한 대규모 연구에서 도출된 고양이 성격의 5가지 핵심 차원입니다.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-bold text-[#1A1A1A] mb-1">기타 참고 연구</h3>
                <p className="mt-1 text-sm">DPQ (Dog Personality Questionnaire, Gosling), DIAS (Dog Impulsivity Assessment Scale), Morrill et al. 2022 (Darwin&apos;s Ark) 등 다수의 동물행동학 연구를 종합적으로 참고하였습니다.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">4축 성격 분석 시스템</h2>
            <div className="mt-3 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="text-sm font-bold text-white bg-[#C4824E] rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">E/I</span>
                <div>
                  <p className="font-bold text-sm text-[#1A1A1A]">외향성 (Extraversion)</p>
                  <p className="text-sm text-[#6B7280]">에너지 수준과 새로운 자극에 대한 반응. 활발하고 탐험적인지, 차분하고 신중한지를 측정합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-sm font-bold text-white bg-[#C4824E] rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">A/R</span>
                <div>
                  <p className="font-bold text-sm text-[#1A1A1A]">친화성 (Amicability)</p>
                  <p className="text-sm text-[#6B7280]">다른 동물이나 사람과의 상호작용 스타일. 사교적인지, 독립적인지를 측정합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-sm font-bold text-white bg-[#C4824E] rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">S/C</span>
                <div>
                  <p className="font-bold text-sm text-[#1A1A1A]">신경성 (Neuroticism)</p>
                  <p className="text-sm text-[#6B7280]">환경 변화나 갑작스러운 자극에 대한 민감도. 예민한지, 안정적인지를 측정합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-sm font-bold text-white bg-[#C4824E] rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">4축</span>
                <div>
                  <p className="font-bold text-sm text-[#1A1A1A]">순응성/지배성</p>
                  <p className="text-sm text-[#6B7280]">강아지는 훈련 순응도(T/F), 고양이는 지배 성향(D/P)을 네 번째 축으로 측정합니다.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">검사 방법</h2>
            <div className="flex flex-col gap-2">
              <p><strong>1단계:</strong> 강아지 또는 고양이를 선택합니다.</p>
              <p><strong>2단계:</strong> 반려동물의 이름과 품종을 입력합니다.</p>
              <p><strong>3단계:</strong> 13개의 상황별 문항에 답변합니다. 선택지가 맞지 않으면 직접 입력할 수도 있습니다.</p>
              <p><strong>4단계:</strong> AI가 응답을 분석하여 16가지 유형 중 하나를 매칭하고, 맞춤형 성격 설명을 생성합니다.</p>
              <p><strong>5단계:</strong> 결과를 이미지로 저장하거나 SNS에 공유할 수 있습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">문의</h2>
            <p>서비스 관련 문의, 피드백, 또는 데이터 삭제 요청은 아래 이메일로 연락해주세요.</p>
            <p className="mt-2">
              <a href="mailto:tailpsych.help@gmail.com" className="text-[#C4824E] font-bold">
                tailpsych.help@gmail.com
              </a>
            </p>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <p className="text-xs text-[#9CA3AF]">
              본 검사는 학술 연구를 참고하여 만든 재미 목적의 성격 유형 검사이며, 수의행동학적 진단을 대체하지 않습니다.
              반려동물의 행동 문제가 심각한 경우 수의사 또는 동물행동전문가와 상담하시기 바랍니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
