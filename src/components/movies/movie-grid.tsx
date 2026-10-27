import type { Movie } from "../../types/movie";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
  onToggleBookmark?: (id: number) => void;
}

export default function MovieGrid({ movies, onToggleBookmark }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return <p className="text-gray-500">등록된 영화가 없어요.</p>;
  }

  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </section>
  );
}