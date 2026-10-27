import MovieGrid from "../../components/movies/movie-grid";
import { movies as initialMovies } from "../../data/movies";
import { useBookmarkStore } from "../../stores/bookmark-store";

export function MovieListPage() {
  // 공용 store에서 북마크 ID 목록 가져오기
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );

  // 기존 MovieGrid의 props 연결을 유지하기 위해 가져오기
  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark,
  );

  // 영화 정보에 store 기준의 북마크 상태 반영
  const movies = initialMovies.map((movie) => ({
    ...movie,
    isBookmarked: bookmarkedMovieIds.includes(movie.id),
  }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        영화 목록
      </h1>
      <MovieGrid
        movies={movies}
        onToggleBookmark={toggleBookmark}
      />
    </main>
  );
}