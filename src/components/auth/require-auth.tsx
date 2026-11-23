"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/auth-store";

export default function RequireAuth({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return <p className="p-8 text-[#606774]">로그인 페이지로 이동하고 있어요.</p>;
  }

  return children;
}
