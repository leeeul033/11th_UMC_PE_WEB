"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { useAuthStore } from "../../stores/auth-store";

export default function Header() {
  const pathname = usePathname();
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useQuery({
  queryKey: ["members", "me"],
  queryFn: getMe,
  enabled: Boolean(accessToken),
  staleTime: 5 * 60 * 1000,
  retry: false,
});
  return (
    <header className="border-b border-[#E3E6EB] bg-white">
      <div className="mx-auto flex min-h-[91px] max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-6 md:px-10 xl:px-20">
        <div className="flex items-center gap-6 md:gap-[42px]">
          <Link
            href="/"
            aria-label="UMCine 홈"
            className="flex items-center gap-2.5 text-[#17191E]"
          >
            <span className="flex size-8 items-center justify-center rounded-lg border-2 border-[#17191E]">
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="6" width="16" height="14" rx="2" />
                <path d="M4 10h16M8 6l2 4M13 6l2 4M18 6l2 4" />
              </svg>
            </span>

            <span className="text-xl font-black tracking-[-0.7px]">
              UMCine
            </span>
          </Link>

          <nav aria-label="주요 메뉴" className="flex items-center gap-5 md:gap-[30px]">
            <Link
              href="/"
              className={`text-sm font-bold hover:text-[#17191E] ${
                pathname === "/"
                  ? "text-[#17191E] underline underline-offset-4"
                  : "text-[#606774]"
              }`}
            >
              영화
            </Link>

            <Link
              href="/search"
              className={`text-sm font-bold hover:text-[#17191E] ${
                pathname === "/search"
                  ? "text-[#17191E] underline underline-offset-4"
                  : "text-[#606774]"
              }`}
            >
              검색
            </Link>
            <Link
  href="/mypage"
  className={`text-sm font-bold hover:text-[#17191E] ${
    pathname === "/mypage" ? "text-[#17191E] underline underline-offset-4" : "text-[#606774]"
  }`}
>
  내 정보
</Link>
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/search"
            aria-label="영화 검색"
            className="flex size-[42px] items-center justify-center rounded-lg border border-[#E3E6EB] text-[#606774] hover:bg-gray-50"
          >
            <svg
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
          </Link>

                    {!accessToken ? (
            <Link
              href="/login"
              className="flex h-[42px] items-center justify-center rounded-lg bg-[#2563EB] px-4 text-sm font-extrabold text-white hover:bg-blue-700"
            >
              로그인
            </Link>
          ) : meQuery.isLoading ? (
            <span
              aria-label="내 정보 불러오는 중"
              className="h-[42px] w-24 animate-pulse rounded-lg bg-gray-200"
            />
          ) : (
            <Link
              href="/mypage"
              className="flex h-[42px] items-center justify-center rounded-lg bg-[#2563EB] px-4 text-sm font-extrabold text-white hover:bg-blue-700"
            >
              마이페이지
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
