import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getFavorites } from "../api/favorites";
import { getMe } from "../api/members/me";
import { getMovieDetail } from "../api/movies/get-movie-detail";
import { useAuthStore } from "../stores/auth-store";
import { getTmdbPosterUrl } from "../utils/movies/tmdb-image";

function FavoriteMovieCard({ movieId }: { movieId: number }) {
  const movieQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    staleTime: 30 * 1000,
  });

  if (movieQuery.isPending) {
    return <p className="text-xs text-[#606774]">영화 정보를 불러오는 중이에요.</p>;
  }

  if (movieQuery.isError) {
    return <p className="text-xs text-red-600">영화 정보를 불러오지 못했어요.</p>;
  }

  const movie = movieQuery.data;
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <article className="min-w-0">
      <Link href={`/movies/${movieId}`}>
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.title} 포스터`}
            className="aspect-[241.6/274] w-full rounded-[10px] object-cover"
          />
        ) : (
          <div className="aspect-[241.6/274] w-full rounded-[10px] bg-[#E3E6EB]" />
        )}
        <h3 className="mt-[9px] text-sm leading-[17px] font-extrabold">
          {movie.title}
        </h3>
        <p className="mt-1 text-xs leading-[14px] text-[#969DA8]">
          {movie.release_date}
        </p>
      </Link>
    </article>
  );
}

export function ProfilePage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const memberId = meQuery.data?.memberId;
  const favoritesQuery = useQuery({
    queryKey: ["members", memberId, "favorites"],
    queryFn: getFavorites,
    enabled: Boolean(accessToken && memberId),
    retry: false,
  });

  if (meQuery.isPending) {
    return <p className="p-8">내 정보를 불러오는 중이에요.</p>;
  }

  if (meQuery.isError || !meQuery.data) {
    return (
      <div className="p-8">
        <p>내 정보를 불러오지 못했어요.</p>
        <button type="button" onClick={() => void meQuery.refetch()} className="mt-3 text-blue-600">
          다시 시도
        </button>
      </div>
    );
  }

  const profile = meQuery.data;

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-5 py-6 md:px-10 xl:px-20">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[31px] leading-[37px] font-bold tracking-[-1.24px]">내 정보</h1>
        <Link href="/profile-edit" className="flex h-[42px] items-center justify-center rounded-lg bg-[#2563EB] px-4 text-sm font-extrabold text-white hover:bg-blue-700">
          정보 수정
        </Link>
      </div>

      <section aria-labelledby="profile-info-title" className="flex flex-col gap-4 border-y border-[#E3E6EB] py-3">
        <h2 id="profile-info-title" className="text-[17px] leading-5 font-bold">기본 정보</h2>
        <dl className="grid w-full max-w-[760px] grid-cols-1 gap-7 sm:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-1.5">
            <dt className="text-[11px] leading-[13px] text-[#969DA8]">닉네임</dt>
            <dd className="text-sm leading-[17px] font-bold">{profile.nickname}</dd>
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <dt className="text-[11px] leading-[13px] text-[#969DA8]">이메일</dt>
            <dd className="break-all text-sm leading-[17px] font-bold">{profile.email}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="favorites-title" className="flex flex-col gap-4">
        <h2 id="favorites-title" className="text-[17px] leading-5 font-bold">내 즐겨찾기</h2>
        {favoritesQuery.isPending ? (
          <p className="text-sm text-[#606774]">즐겨찾기를 불러오는 중이에요.</p>
        ) : favoritesQuery.isError ? (
          <div>
            <p className="text-sm text-red-600">즐겨찾기를 불러오지 못했어요.</p>
            <button type="button" onClick={() => void favoritesQuery.refetch()} className="mt-2 text-sm text-blue-600">
              다시 시도
            </button>
          </div>
        ) : favoritesQuery.data.length === 0 ? (
          <p className="text-sm text-[#606774]">아직 즐겨찾기한 영화가 없어요.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-[18px] gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {favoritesQuery.data.map((favorite) => (
              <FavoriteMovieCard key={favorite.favoriteId} movieId={favorite.movieId} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
