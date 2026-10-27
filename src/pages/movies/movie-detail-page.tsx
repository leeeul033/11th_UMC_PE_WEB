import { useEffect, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { BookmarkButton } from "../../components/bookmark-button";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";

function formatRuntime(runtime: number | null) {
  if (runtime === null) return "상영 시간 정보가 없어요.";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
}

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    setMovie(null);
    setErrorMessage(null);

    if (!isValidMovieId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    getMovieDetail(parsedMovieId)
      .then((response) => {
        if (!ignore) setMovie(response);
      })
      .catch((error) => {
        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [parsedMovieId, isValidMovieId]);

  if (!isValidMovieId) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          올바르지 않은 영화 번호예요.
        </p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          영화 정보를 불러오는 중이에요.
        </p>
      </main>
    );
  }

  if (errorMessage || !movie) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          {errorMessage ?? "영화 정보를 불러오지 못했어요."}
        </p>
      </main>
    );
  }

  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);

  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      <div className="absolute inset-0 h-[400px] w-full overflow-hidden bg-gray-800 opacity-30">
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        )}
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
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="w-64 rounded-xl shadow-2xl"
            />
          ) : (
            <div className="flex aspect-[2/3] w-64 items-center justify-center rounded-xl bg-gray-700 text-sm text-gray-300">
              이미지 없음
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-4xl font-extrabold">{movie.title}</h1>
            <p className="mt-1 text-lg text-gray-400">{movie.original_title}</p>

            <div className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
              <BookmarkButton movieId={movie.id} />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-300">
              <span>{movie.release_date}</span>
              <span>·</span>
              <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>
              <span>·</span>
              <span>{formatRuntime(movie.runtime)}</span>
            </div>

            {movie.tagline && (
              <p className="mt-6 text-xl font-semibold italic text-blue-400">
                "{movie.tagline}"
              </p>
            )}

            <div className="mt-6">
              <h2 className="text-lg font-bold text-gray-200">줄거리</h2>
              <p className="mt-2 leading-relaxed text-gray-300">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}