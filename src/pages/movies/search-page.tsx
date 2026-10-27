import { useEffect, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { searchMovies } from "../../api/movies/search-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { BookmarkButton } from "../../components/bookmark-button";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const trimmedQuery = query?.trim() ?? "";

  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    setMovies([]);
    setErrorMessage(null);

    if (!trimmedQuery) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    searchMovies({ query: trimmedQuery })
      .then((response) => {
        if (!ignore) setMovies(response.results);
      })
      .catch(() => {
        if (!ignore) setErrorMessage("검색 결과를 불러오지 못했어요.");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [trimmedQuery]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">영화 검색</h1>

      {!trimmedQuery ? (
        <p className="text-gray-500">검색어를 입력해 주세요.</p>
      ) : isLoading ? (
        <p className="text-gray-500">검색 결과를 불러오는 중이에요.</p>
      ) : errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : movies.length === 0 ? (
        <p className="text-gray-500">
          "<span className="font-semibold">{trimmedQuery}</span>"에 대한 검색
          결과가 없어요.
        </p>
      ) : (
        <div>
          <p className="mb-4 text-sm text-gray-600">
            <span className="font-bold text-blue-600">{movies.length}</span>
            개의 영화를 찾았어요.
          </p>
          <div className="flex flex-col gap-4">
            {movies.map((movie) => {
              const posterUrl = getTmdbPosterUrl(movie.poster_path);

              return (
                <div
                  key={movie.id}
                  className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="flex gap-4"
                  >
                    {posterUrl ? (
                      <img
                        src={posterUrl}
                        alt={`${movie.title} 포스터`}
                        className="h-36 w-24 rounded object-cover"
                      />
                    ) : (
                      <div className="flex h-36 w-24 items-center justify-center rounded bg-gray-200 text-xs text-gray-500">
                        이미지 없음
                      </div>
                    )}

                    <div className="flex flex-col justify-center">
                      <h2 className="text-lg font-bold text-gray-900">
                        {movie.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {movie.original_title}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {movie.release_date}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-gray-700">
                        {movie.overview}
                      </p>
                    </div>
                  </Link>

                  <div className="mt-3 flex justify-end text-sm font-semibold text-blue-600">
                    <BookmarkButton movieId={movie.id} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}