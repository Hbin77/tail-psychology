import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "꼬리심리학 | 반려동물 성격 유형 검사",
  description: "학술 연구 기반 AI 반려동물 성격 분석. 13개 문항으로 알아보는 우리 아이의 행동 성격 유형.",
  openGraph: {
    title: "꼬리심리학",
    description: "학술 연구 기반 반려동물 성격 유형 검사",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geist.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
