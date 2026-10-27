import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: Movie;

  // 기존 MovieGrid와의 호환을 위해 잠시 유지
  // 이 카드 안에서는 더 이상 사용하지 않음
  onToggleBookmark?: (id: number) => void;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[10px] bg-white shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
        className="block"
      >
        {/* 포스터 영역 */}
        <div className="aspect-[2/3] w-full overflow-hidden bg-gray-200">
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        {/* 제목과 개봉일 */}
        <div className="p-3">
          <h3 className="truncate text-base font-bold text-gray-900 group-hover:text-blue-600">
            {movie.title}
          </h3>
          {movie.releaseDate && (
            <p className="mt-1 text-xs text-gray-500">
              {movie.releaseDate}
            </p>
          )}
        </div>
      </Link>

      {/* 버튼 자체가 Zustand에서 상태를 읽고 변경 */}
      <div className="absolute right-2 top-2 rounded bg-white px-2 py-1 text-sm shadow">
        <BookmarkButton movieId={movie.id} />
      </div>
    </article>
  );
}