import { BookmarkButton } from "../../components/bookmark-button";


import { Link, useSearch } from "@tanstack/react-router";
import { movies } from "../../data/movies";


export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const trimmedQuery = query?.trim() ?? "";

  const filteredMovies = trimmedQuery
    ? movies.filter(
        (m) =>
          m.title.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
          m.originalTitle.toLowerCase().includes(trimmedQuery.toLowerCase())
      )
    : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">영화 검색</h1>

      {!trimmedQuery ? (
        <p className="text-gray-500">검색어를 입력해 주세요.</p>
      ) : filteredMovies.length === 0 ? (
        <p className="text-gray-500">
          "<span className="font-semibold">{trimmedQuery}</span>"에 대한 검색 결과가 없습니다.
        </p>
      ) : (
        <div>
          <p className="mb-4 text-sm text-gray-600">
            총 <span className="font-bold text-blue-600">{filteredMovies.length}</span>개의 영화를 찾았습니다.
          </p>
          <div className="flex flex-col gap-4">
            {filteredMovies.map((movie) => (
  <div
    key={movie.id}
    className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
  >
    {/* 영화 정보를 누르면 상세 페이지로 이동 */}
    <Link
      to="/movies/$movieId"
      params={{ movieId: String(movie.id) }}
      className="flex gap-4"
    >
      <img
        src={movie.posterPath}
        alt={`${movie.title} 포스터`}
        className="h-36 w-24 rounded object-cover"
      />

      <div className="flex flex-col justify-center">
        <h2 className="text-lg font-bold text-gray-900">
          {movie.title}
        </h2>
        <p className="text-sm text-gray-500">
          {movie.originalTitle}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          {movie.releaseDate}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-gray-700">
          {movie.overview}
        </p>
      </div>
    </Link>

    {/* 링크 밖에 두어 북마크 클릭과 페이지 이동을 분리 */}
    <div className="mt-3 flex justify-end text-sm font-semibold text-blue-600">
      <BookmarkButton movieId={movie.id} />
    </div>
  </div>
))}
          </div>
        </div>
      )}
    </main>
  );
}