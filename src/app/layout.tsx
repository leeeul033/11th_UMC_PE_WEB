import type { Metadata } from "next";
import Footer from "../components/footer";
import Header from "../components/layout/header";
import "../index.css";
import Providers from "../components/providers";

export const metadata: Metadata = {
  title: {
    default: "UMCine",
    template: "%s | UMCine",
  },
  description: "TMDB API를 활용한 UMC 영화 정보 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col bg-[#F6F7F9] text-[#17191E]">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
