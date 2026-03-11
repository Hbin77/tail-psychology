import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '이용약관 | 꼬리심리학',
  description: '꼬리심리학 서비스 이용약관',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-[#9CA3AF] hover:text-[#6B7280] mb-8 inline-block">
          &larr; 홈으로 돌아가기
        </Link>

        <h1 className="text-2xl font-black text-[#1A1A1A] mb-8">이용약관</h1>

        <div className="prose prose-sm max-w-none text-[#4B5563] leading-relaxed flex flex-col gap-6">
          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">제1조 (목적)</h2>
            <p>본 약관은 꼬리심리학(이하 &ldquo;서비스&rdquo;)이 제공하는 반려동물 성격 유형 검사 서비스의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">제2조 (서비스의 내용)</h2>
            <p>서비스는 다음과 같은 기능을 제공합니다.</p>
            <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
              <li>C-BARQ, Feline Five 등 학술 연구를 참고한 반려동물 성격 유형 검사</li>
              <li>AI 기반 맞춤형 성격 분석 결과 제공</li>
              <li>검사 결과 이미지 생성 및 SNS 공유 기능</li>
              <li>유형별 궁합 분석</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">제3조 (서비스의 성격)</h2>
            <p>본 서비스는 <strong>재미 및 참고 목적</strong>으로 제공되는 성격 유형 검사이며, 수의행동학적 진단이나 의학적 조언을 대체하지 않습니다. 반려동물의 행동 문제나 건강에 대한 전문적인 상담이 필요한 경우, 수의사 또는 동물행동전문가에게 문의하시기 바랍니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">제4조 (이용자의 의무)</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>이용자는 서비스를 정상적인 용도로만 사용해야 합니다.</li>
              <li>타인의 정보를 무단으로 이용하거나, 서비스의 운영을 방해하는 행위를 하여서는 안 됩니다.</li>
              <li>검사 결과를 상업적 목적으로 무단 이용하여서는 안 됩니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">제5조 (지적재산권)</h2>
            <p>서비스에서 제공하는 검사 문항, AI 분석 결과 텍스트, 디자인, 유형 체계 등 모든 콘텐츠에 대한 저작권은 서비스 운영자에게 있습니다. 단, 이용자가 생성한 검사 결과 이미지를 개인 SNS에 공유하는 것은 허용됩니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">제6조 (면책사항)</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>서비스는 검사 결과의 정확성, 완전성을 보장하지 않습니다.</li>
              <li>서비스 이용으로 인해 발생한 직접적, 간접적 손해에 대해 책임을 지지 않습니다.</li>
              <li>천재지변, 시스템 장애 등 불가항력적 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">제7조 (광고)</h2>
            <p>서비스는 운영을 위해 Google AdSense, 카카오 애드핏, 쿠팡 파트너스 등의 광고를 포함할 수 있습니다. 광고와 관련된 거래는 이용자와 광고주 간의 문제이며, 서비스는 이에 대해 책임을 지지 않습니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">제8조 (약관의 변경)</h2>
            <p>서비스는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내에 공지함으로써 효력이 발생합니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">부칙</h2>
            <p>본 약관은 2026년 3월 11일부터 시행됩니다.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
