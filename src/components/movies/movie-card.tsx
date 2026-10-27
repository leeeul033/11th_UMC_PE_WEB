import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: TmdbMovieListItem;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <article className="group relative overflow-hidden rounded-[10px] bg-white shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
        className="block"
      >
        <div className="aspect-[2/3] w-full overflow-hidden bg-gray-200">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
              이미지 없음
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="truncate text-base font-bold text-gray-900 group-hover:text-blue-600">
            {movie.title}
          </h3>
          {movie.release_date && (
            <p className="mt-1 text-xs text-gray-500">
              {movie.release_date}
            </p>
          )}
        </div>
      </Link>

      <div className="absolute right-2 top-2 rounded bg-white px-2 py-1 text-sm shadow">
        <BookmarkButton movieId={movie.id} />
      </div>
    </article>
  );
}