import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BookmarkStore {
  bookmarkedMovieIds: number[];
  toggleBookmark: (movieId: number) => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
  // 기존 store에 저장 기능을 추가
  persist(
    (set) => ({
      // 저장된 값이 없을 때 사용할 기본값
      bookmarkedMovieIds: [],

      // 북마크 켜기 / 끄기
      toggleBookmark: (movieId) =>
        set((state) => ({
          bookmarkedMovieIds: state.bookmarkedMovieIds.includes(movieId)
            // 이미 있으면 제거
            ? state.bookmarkedMovieIds.filter((id) => id !== movieId)
            // 없으면 추가
            : [...state.bookmarkedMovieIds, movieId],
        })),
    }),

    // 저장 설정
    {
      // localStorage에 저장할 이름(key)
      name: "umcine-bookmark-store",

      // localStorage 사용 + JSON 변환 처리
      storage: createJSONStorage(() => localStorage),

      // store에서 저장할 데이터만 선택
      partialize: (state) => ({
        bookmarkedMovieIds: state.bookmarkedMovieIds,
      }),
    },
  ),
);