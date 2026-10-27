import { useBookmarkStore } from "../stores/bookmark-store";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  // 이 영화가 북마크됐는지만 store에서 선택
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );

  // 북마크를 바꾸는 함수만 store에서 선택
  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark,
  );

  return (
    <button type="button" onClick={() => toggleBookmark(movieId)}>
      {isBookmarked ? "북마크 해제" : "북마크 추가"}
    </button>
  );
}