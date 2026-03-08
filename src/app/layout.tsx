import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "꼬리심리학 - 우리 아이 꼬리가 말해주는 진짜 성격",
  description: "반려동물 성격 유형 검사. 멍BTI & 냥BTI로 우리 아이의 진짜 성격을 알아보세요!",
  openGraph: {
    title: "꼬리심리학 🐾",
    description: "우리 아이 꼬리가 말해주는 진짜 성격",
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
