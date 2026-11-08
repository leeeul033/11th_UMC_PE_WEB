import { useState, type FormEvent } from "react";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DuplicateCheckKey = "email" | "nickname";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
  email: { ...DEFAULT_DUPLICATE_CHECK },
  nickname: { ...DEFAULT_DUPLICATE_CHECK },
});

  const isEmailValid = EMAIL_REGEX.test(form.email.trim());

  const isNicknameValid =
    form.nickname.trim().length >= 2 &&
    form.nickname.trim().length <= 12;

  const isPasswordValid = PASSWORD_REGEX.test(form.password);

  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 &&
    form.password === form.passwordConfirm;

  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;
    const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;
    

  const handleChangeField = (
  key: DefaultFormKey,
  value: DefaultFormValue,
) => {
  if (key === "email" || key === "nickname") {
    if (duplicateCheck[key].isChecking) return;

    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { ...DEFAULT_DUPLICATE_CHECK },
    }));
  }

  setForm((prev) => ({ ...prev, [key]: value }));
};

const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
  const isValid = key === "email" ? isEmailValid : isNicknameValid;

  if (!isValid || duplicateCheck[key].isChecking) return;

  const label = key === "email" ? "이메일" : "닉네임";

  setDuplicateCheck((prev) => ({
    ...prev,
    [key]: {
      isChecking: true,
      isAvailable: false,
    },
  }));

  try {
    const response =
      key === "email"
        ? await checkEmailDuplicate(form.email.trim())
        : await checkNicknameDuplicate(form.nickname.trim());

    const isAvailable = response.available;

    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        isAvailable,
      },
    }));

    alert(
      isAvailable
        ? `사용할 수 있는 ${label}이에요.`
        : `이미 사용 중인 ${label}이에요.`,
    );
  } catch {
    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        isAvailable: false,
      },
    }));

    alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
  } finally {
    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        isChecking: false,
      },
    }));
  }
};

 const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!canSubmit) return;

  // 3.4에서 실제 회원가입 API 요청을 추가해요.
};

  const fieldClass =
    "flex min-h-[49px] items-center gap-2 rounded-lg border bg-white px-[13px] focus-within:ring-2 focus-within:ring-blue-200";

  const inputClass =
    "min-w-0 flex-1 bg-transparent text-sm text-[#17191E] outline-none placeholder:text-[#969DA8]";

  const labelClass = "text-[13px] font-extrabold text-[#17191E]";
  const errorClass = "text-xs text-red-600";

  const duplicateButtonClass =
    "shrink-0 text-xs font-extrabold text-[#2563EB] disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <section className="flex min-h-[calc(100dvh-91px)] items-center justify-center bg-[#F6F7F9] px-5 py-12">
      <form
        id="signup-form"
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-[430px] flex-col gap-4"
      >
        <h1 className="text-[34px] leading-[41px] font-bold tracking-[-1.53px] text-[#17191E]">
          회원가입
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="signup-email" className={labelClass}>
            이메일
          </label>

          <div
            className={`${fieldClass} ${
              showEmailError ? "border-red-500" : "border-[#E3E6EB]"
            }`}
          >
            <input
              id="signup-email"
              disabled={duplicateCheck.email.isChecking}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => handleChangeField("email", e.target.value)}
              aria-invalid={showEmailError}
              aria-describedby={showEmailError ? "email-error" : undefined}
              className={inputClass}
            />

            <button
  type="button"
  disabled={!isEmailValid || duplicateCheck.email.isChecking}
  onClick={() => handleCheckDuplicate("email")}
  className={duplicateButtonClass}
>
  {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
</button>
          </div>

          {showEmailError && (
            <p id="email-error" className={errorClass}>
              올바른 이메일 형식으로 입력해 주세요.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="signup-nickname" className={labelClass}>
            닉네임
          </label>

          <div
            className={`${fieldClass} ${
              showNicknameError ? "border-red-500" : "border-[#E3E6EB]"
            }`}
          >
            <input
              id="signup-nickname"
              disabled={duplicateCheck.nickname.isChecking}
              name="nickname"
              type="text"
              autoComplete="nickname"
              placeholder="2–12자"
              value={form.nickname}
              onChange={(e) => handleChangeField("nickname", e.target.value)}
              aria-invalid={showNicknameError}
              aria-describedby={
                showNicknameError ? "nickname-error" : undefined
              }
              className={inputClass}
            />

            <button
  type="button"
  disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
  onClick={() => handleCheckDuplicate("nickname")}
  className={duplicateButtonClass}
>
  {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
</button>
          </div>

          {showNicknameError && (
            <p id="nickname-error" className={errorClass}>
              닉네임은 앞뒤 공백을 제외하고 2~12자로 입력해 주세요.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="signup-password" className={labelClass}>
            비밀번호
          </label>

          <div
            className={`${fieldClass} ${
              showPasswordError ? "border-red-500" : "border-[#E3E6EB]"
            }`}
          >
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="8자 이상"
              value={form.password}
              onChange={(e) => handleChangeField("password", e.target.value)}
              aria-invalid={showPasswordError}
              aria-describedby={
                showPasswordError
                  ? "password-help password-error"
                  : "password-help"
              }
              className={inputClass}
            />
          </div>

          <p
            id="password-help"
            className="text-[11px] leading-4 text-[#969DA8]"
          >
            영문 대·소문자, 숫자, 특수문자(!@#$%^&amp;*)를 모두 포함해
            8자 이상 입력해 주세요.
          </p>

          {showPasswordError && (
            <p id="password-error" className={errorClass}>
              비밀번호 조건을 확인해 주세요. 공백은 사용할 수 없어요.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="signup-password-confirm" className={labelClass}>
            비밀번호 확인
          </label>

          <div
            className={`${fieldClass} ${
              showPasswordConfirmError
                ? "border-red-500"
                : "border-[#E3E6EB]"
            }`}
          >
            <input
              id="signup-password-confirm"
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              placeholder="다시 입력"
              value={form.passwordConfirm}
              onChange={(e) =>
                handleChangeField("passwordConfirm", e.target.value)
              }
              aria-invalid={showPasswordConfirmError}
              aria-describedby={
                showPasswordConfirmError
                  ? "password-confirm-error"
                  : undefined
              }
              className={inputClass}
            />
          </div>

          {showPasswordConfirmError && (
            <p id="password-confirm-error" className={errorClass}>
              비밀번호가 일치하지 않아요.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="h-12 w-full rounded-lg bg-[#2563EB] text-sm font-extrabold text-white transition-colors enabled:cursor-pointer enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          가입하기
        </button>

        <div className="flex items-center justify-center gap-1 text-[13px] text-[#606774]">
          <span>이미 계정이 있나요?</span>
          <button
            type="button"
            disabled
            title="필수 미션에서 로그인 페이지를 만든 뒤 연결해요."
            className="text-xs font-extrabold text-[#2563EB] disabled:cursor-not-allowed"
          >
            로그인
          </button>
        </div>
      </form>
    </section>
  );
}