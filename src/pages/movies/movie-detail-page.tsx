import { BookmarkButton } from "../../components/bookmark-button";
import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg font-medium text-gray-600">영화를 찾을 수 없어요.</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      {/* 히어로 배경 이미지 */}
      <div className="absolute inset-0 h-[400px] w-full overflow-hidden opacity-30">
        <img
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8">
        <Link
          to="/"
          className="mb-6 inline-block text-sm font-medium text-gray-300 hover:text-white"
        >
          ← 영화 목록으로 돌아가기
        </Link>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-start">
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="w-64 rounded-xl shadow-2xl"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold">{movie.title}</h1>
            <p className="mt-1 text-lg text-gray-400">{movie.originalTitle}</p>
            {/* 목록·검색과 같은 store를 사용하는 북마크 버튼 */}
<div className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
  <BookmarkButton movieId={movie.id} />
</div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-300">
              <span>{movie.releaseDate}</span>
              <span>·</span>
              <span>{movie.genres.join(" · ")}</span>
              <span>·</span>
              <span>{movie.runtime}</span>
            </div>

            {movie.tagline && (
              <p className="mt-6 text-xl font-semibold italic text-blue-400">
                "{movie.tagline}"
              </p>
            )}

            <div className="mt-6">
              <h2 className="text-lg font-bold text-gray-200">줄거리</h2>
              <p className="mt-2 leading-relaxed text-gray-300">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}