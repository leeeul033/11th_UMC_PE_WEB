import { useState, type ChangeEvent, type FormEvent } from "react";

const DEFAULT_PROFILE = {
  nickname: "jenny",
  email: "jenny@example.com",
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export function ProfileEditPage() {
  const [nickname, setNickname] = useState(DEFAULT_PROFILE.nickname);
  const [preview, setPreview] = useState("");
  const [imageError, setImageError] = useState("");

  const isNicknameValid =
    nickname.trim().length >= 2 && nickname.trim().length <= 12;

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError("");

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setImageError("JPG, PNG, WebP 이미지를 선택해 주세요.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("이미지는 최대 5MB까지 선택할 수 있어요.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };

    reader.onerror = () => {
      setImageError("이미지를 읽지 못했어요. 다시 선택해 주세요.");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isNicknameValid) return;

    alert(
      "입력값을 확인했어요. 이번 주차는 화면 구현 단계이므로 서버에는 저장되지 않아요.",
    );
  };

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-148px)] max-w-[1440px] flex-col gap-8 px-5 py-6 md:px-10 xl:px-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[31px] leading-[37px] font-bold tracking-[-1.24px]">
            내 정보 수정
          </h1>
          <p className="mt-[9px] text-sm leading-[23px] text-[#606774]">
            닉네임과 프로필 이미지만 변경할 수 있어요.
          </p>
        </div>

        <button
          type="submit"
          form="profile-form"
          disabled={!isNicknameValid}
          className="h-[42px] rounded-lg bg-[#2563EB] px-4 text-sm font-extrabold text-white enabled:cursor-pointer enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          변경사항 저장
        </button>
      </div>

      <form
        id="profile-form"
        onSubmit={handleSubmit}
        noValidate
        className="grid items-center gap-8 md:grid-cols-2 md:gap-0"
      >
        <div className="flex flex-col items-center gap-1">
          <label
            htmlFor="profile-image"
            className="relative cursor-pointer rounded-full focus-within:ring-2 focus-within:ring-blue-500"
          >
            <span className="flex size-[82px] items-center justify-center overflow-hidden rounded-full bg-[#E3E6EB]">
              {preview ? (
                <img
                  src={preview}
                  alt="선택한 프로필 이미지 미리보기"
                  className="size-full object-cover"
                />
              ) : (
                <svg
                  aria-hidden="true"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21v-2a8 8 0 0 1 16 0v2H4Z" />
                </svg>
              )}
            </span>

            <span className="absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-full border-2 border-[#17191E] bg-white">
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
              >
                <path d="m15 5 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15v5Z" />
              </svg>
            </span>

            <input
              id="profile-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleChangeImage}
              aria-label="프로필 이미지 선택"
              aria-describedby="profile-image-help profile-image-error"
              className="sr-only"
            />
          </label>

          <p className="text-[15px] font-bold">프로필 이미지</p>
          <p
            id="profile-image-help"
            className="text-[11px] text-[#969DA8]"
          >
            선택 사항 · 최대 5MB
          </p>
          <p
            id="profile-image-error"
            role="status"
            className="text-xs text-red-600"
          >
            {imageError}
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-[17px]">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="profile-nickname"
              className="text-[13px] font-extrabold"
            >
              닉네임
            </label>

            <div className="flex h-[49px] items-center gap-2 rounded-lg border border-[#E3E6EB] bg-white px-[13px] focus-within:ring-2 focus-within:ring-blue-200">
              <input
                id="profile-nickname"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                aria-invalid={!isNicknameValid}
                aria-describedby={
                  !isNicknameValid ? "profile-nickname-error" : undefined
                }
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              />

              <button
                type="button"
                disabled
                title="이번 주차는 화면만 구현하며 중복 확인은 연결하지 않아요."
                className="shrink-0 cursor-not-allowed text-xs font-extrabold text-[#2563EB] opacity-50"
              >
                중복 확인
              </button>
            </div>

            {!isNicknameValid && (
              <p
                id="profile-nickname-error"
                className="text-xs text-red-600"
              >
                닉네임은 앞뒤 공백을 제외하고 2~12자로 입력해 주세요.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="profile-email"
              className="text-[13px] font-extrabold"
            >
              이메일
            </label>

            <input
              id="profile-email"
              name="email"
              type="email"
              value={DEFAULT_PROFILE.email}
              readOnly
              className="h-[49px] w-full rounded-lg border border-[#E3E6EB] bg-white px-[13px] text-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
      </form>

      <section
        aria-labelledby="delete-account-title"
        className="mt-auto flex flex-wrap items-center justify-between gap-4 rounded-[10px] border border-[#D92D20] bg-[#D92D20]/10 p-5"
      >
        <div className="flex flex-col gap-1 text-[#D92D20]">
          <h2 id="delete-account-title" className="text-sm font-bold">
            회원 탈퇴
          </h2>
          <p className="text-[11px] leading-4">
            탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수
            없습니다.
          </p>
        </div>

        <button
          type="button"
          disabled
          title="회원 탈퇴 API는 연결하지 않았어요."
          className="h-[42px] cursor-not-allowed rounded-lg border border-[#D92D20] bg-white px-4 text-sm font-extrabold text-[#D92D20]"
        >
          회원 탈퇴
        </button>
      </section>
    </div>
  );
}