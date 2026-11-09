const DEMO_PROFILE = {
  nickname: "jenny",
  email: "jenny@example.com",
};

const DEMO_FAVORITES = [
  {
    id: "spider-man",
    title: "스파이더맨: 브랜드 뉴 데이",
    releaseDate: "2026.07.29",
    poster: "/images/movies/spider-man-brand-new-day.jpg",
  },
  {
    id: "odyssey",
    title: "오디세이",
    releaseDate: "2026.08.05",
    poster: "/images/movies/odyssey.jpg",
  },
  {
    id: "minions",
    title: "미니언즈 & 몬스터즈",
    releaseDate: "2026.07.15",
    poster: "/images/movies/minions-monsters.jpg",
  },
];

export function ProfilePage() {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-5 py-6 md:px-10 xl:px-20">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[31px] leading-[37px] font-bold tracking-[-1.24px]">
          내 정보
        </h1>

        <button
          type="button"
          disabled
          title="내 정보 수정 화면을 만든 뒤 연결해요."
          className="flex h-[42px] items-center justify-center rounded-lg bg-[#2563EB] px-4 text-sm font-extrabold text-white disabled:cursor-not-allowed"
        >
          정보 수정
        </button>
      </div>

      <section
        aria-labelledby="profile-info-title"
        className="flex flex-col gap-4 border-y border-[#E3E6EB] py-3"
      >
        <h2
          id="profile-info-title"
          className="text-[17px] leading-5 font-bold"
        >
          기본 정보
        </h2>

        <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
          <span className="flex size-[82px] shrink-0 items-center justify-center rounded-full bg-[#E3E6EB]">
            <svg
              aria-hidden="true"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#17191E]"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21v-2a8 8 0 0 1 16 0v2H4Z" />
            </svg>
            <span className="sr-only">기본 프로필 이미지</span>
          </span>

          <dl className="grid w-full max-w-[760px] grid-cols-1 gap-7 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-1.5">
              <dt className="text-[11px] leading-[13px] text-[#969DA8]">
                닉네임
              </dt>
              <dd className="text-sm leading-[17px] font-bold">
                {DEMO_PROFILE.nickname}
              </dd>
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <dt className="text-[11px] leading-[13px] text-[#969DA8]">
                이메일
              </dt>
              <dd className="break-all text-sm leading-[17px] font-bold">
                {DEMO_PROFILE.email}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="favorites-title"
        className="flex flex-col gap-4"
      >
        <h2
          id="favorites-title"
          className="text-[17px] leading-5 font-bold"
        >
          내 즐겨찾기
        </h2>

        <div className="grid grid-cols-2 gap-x-[18px] gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {DEMO_FAVORITES.map((movie) => (
            <article key={movie.id} className="min-w-0">
              <img
                src={movie.poster}
                alt={`${movie.title} 포스터`}
                className="aspect-[241.6/274] w-full rounded-[10px] object-cover"
              />

              <h3 className="mt-[9px] text-sm leading-[17px] font-extrabold">
                {movie.title}
              </h3>

              <p className="mt-1 text-xs leading-[14px] text-[#969DA8]">
                {movie.releaseDate}
              </p>
            </article>
          ))}
        </div>

        <nav
          aria-label="즐겨찾기 목록 페이지"
          className="mt-1 flex items-center justify-center gap-3"
        >
          <button
            type="button"
            disabled
            aria-label="이전 페이지"
            className="flex size-6 items-center justify-center text-[#D9E5FF]"
          >
            <svg
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m14 6-6 6 6 6" />
            </svg>
          </button>

          <span
            aria-current="page"
            className="flex size-9 items-center justify-center rounded-[7px] bg-[#17191E] text-[13px] font-bold text-white"
          >
            1
          </span>

          <button
            type="button"
            disabled
            aria-label="다음 페이지"
            className="flex size-6 items-center justify-center text-[#D9E5FF]"
          >
            <svg
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m10 6 6 6-6 6" />
            </svg>
          </button>
        </nav>
      </section>
    </div>
  );
}