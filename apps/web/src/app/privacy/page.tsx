import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '개인정보처리방침 | 꼬리심리학',
  description: '꼬리심리학 개인정보처리방침',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-[#9CA3AF] hover:text-[#6B7280] mb-8 inline-block">
          &larr; 홈으로 돌아가기
        </Link>

        <h1 className="text-2xl font-black text-[#1A1A1A] mb-8">개인정보처리방침</h1>

        <div className="prose prose-sm max-w-none text-[#4B5563] leading-relaxed flex flex-col gap-6">
          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">1. 수집하는 개인정보 항목</h2>
            <p>꼬리심리학(이하 &ldquo;서비스&rdquo;)은 반려동물 성격 유형 검사를 제공하기 위해 다음 정보를 수집합니다.</p>
            <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
              <li>반려동물 이름, 종류(강아지/고양이), 품종</li>
              <li>검사 응답 데이터 (선택형 답변, 자유 서술 텍스트)</li>
              <li>서비스 이용 기록, 접속 로그 (자동 수집)</li>
            </ul>
            <p className="mt-2">본 서비스는 보호자(사용자)의 실명, 이메일, 전화번호 등 직접적인 개인 식별 정보를 수집하지 않습니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">2. 개인정보의 수집 및 이용 목적</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>반려동물 성격 유형 분석 및 결과 제공</li>
              <li>AI 기반 맞춤 성격 설명 생성</li>
              <li>서비스 개선 및 통계 분석</li>
              <li>결과 공유 기능 제공 (공유 링크 생성)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">3. 개인정보의 보유 및 이용 기간</h2>
            <p>검사 결과 데이터는 공유 링크 제공을 위해 서버에 저장되며, 생성일로부터 <strong>1년간</strong> 보관 후 자동 삭제됩니다. 사용자가 삭제를 요청하는 경우 즉시 삭제합니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">4. 개인정보의 제3자 제공</h2>
            <p>서비스는 수집한 정보를 제3자에게 제공하지 않습니다. 단, 다음의 경우는 예외로 합니다.</p>
            <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
              <li>AI 성격 분석을 위한 OpenAI API 전송 (반려동물 정보 및 응답 데이터만 전송되며, 사용자 개인 식별 정보는 포함되지 않습니다)</li>
              <li>법률에 의해 요구되는 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">5. 쿠키 및 광고</h2>
            <p>서비스는 다음과 같은 제3자 광고 서비스를 이용합니다.</p>
            <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
              <li><strong>Google AdSense</strong>: 맞춤형 광고 제공을 위해 쿠키를 사용할 수 있습니다. 사용자는 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#C4824E] underline">Google 광고 설정</a>에서 맞춤 광고를 비활성화할 수 있습니다.</li>
              <li><strong>카카오 애드핏</strong>: 광고 제공을 위해 쿠키를 사용할 수 있습니다.</li>
              <li><strong>쿠팡 파트너스</strong>: 제휴 링크를 통한 상품 추천이 포함됩니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">6. 이용자의 권리</h2>
            <p>이용자는 언제든지 자신의 데이터 삭제를 요청할 수 있으며, 아래 연락처로 문의하시면 됩니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">7. 개인정보 보호 책임자</h2>
            <ul className="list-none flex flex-col gap-1">
              <li>서비스명: 꼬리심리학</li>
              <li>이메일: phb007298@gmail.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">8. 개정 이력</h2>
            <p>본 개인정보처리방침은 2026년 3월 11일부터 시행됩니다.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
