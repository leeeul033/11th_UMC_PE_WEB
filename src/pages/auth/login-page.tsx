import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 7주차는 화면 구현만 진행해요.
    // 로그인 API는 8주차에 연결해요.
  };

  const fieldClass =
    "flex h-[49px] items-center gap-1 rounded-lg border border-[#E3E6EB] bg-white px-[13px] focus-within:ring-2 focus-within:ring-blue-200";

  const inputClass =
    "min-w-0 flex-1 bg-transparent px-0.5 text-sm text-[#17191E] outline-none placeholder:text-[#969DA8]";

  const labelClass = "text-[13px] font-extrabold leading-4 text-[#17191E]";

  return (
    <section className="flex min-h-[calc(100dvh-148px)] items-center justify-center bg-[#F6F7F9] px-5 py-12">
      <form
        id="login-form"
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-[430px] flex-col gap-4"
      >
        <h1 className="text-[34px] leading-[41px] font-bold tracking-[-1.53px] text-[#17191E]">
          로그인
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="login-email" className={labelClass}>
            이메일
          </label>

          <div className={fieldClass}>
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-[#606774]"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>

            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="username"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="login-password" className={labelClass}>
            비밀번호
          </label>

          <div className={fieldClass}>
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-[#606774]"
            >
              <rect x="5" y="10" width="14" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              <path d="M12 14v3" />
            </svg>

            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          className="h-12 w-full cursor-pointer rounded-lg border border-white bg-[#2563EB] text-sm font-extrabold text-white transition-colors hover:bg-blue-700"
        >
          로그인
        </button>

        <div className="flex items-center justify-center gap-1 pt-[5px] text-[13px] leading-4 text-[#606774]">
          <span>처음이신가요?</span>

          <Link
            to="/signup"
            className="text-xs font-extrabold text-[#2563EB] hover:underline"
          >
            회원가입
          </Link>
        </div>
      </form>
    </section>
  );
}