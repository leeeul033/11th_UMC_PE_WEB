import { useQuery } from "@tanstack/react-query";
import { getFavoriteStatus } from "../api/favorites";
import { getMe } from "../api/members/me";
import { useFavoriteMutation } from "../hooks/use-favorite-mutation";
import { useAuthStore } from "../stores/auth-store";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const memberId = meQuery.data?.memberId;
  const favoriteStatusQuery = useQuery({
    queryKey: ["members", memberId, "favorites", "status", movieId],
    queryFn: () => getFavoriteStatus(movieId),
    enabled: Boolean(accessToken && memberId),
    retry: false,
  });
  const favoriteMutation = useFavoriteMutation();

  const handleClick = () => {
    if (!accessToken) {
      alert("즐겨찾기는 로그인 후 이용할 수 있어요.");
      return;
    }

    if (!memberId || favoriteStatusQuery.isPending || favoriteStatusQuery.isError) {
      return;
    }

    favoriteMutation.mutate({
      memberId,
      movieId,
      isFavorite: favoriteStatusQuery.data.favorite,
    });
  };

  if (accessToken && (meQuery.isPending || favoriteStatusQuery.isPending)) {
    return <span aria-live="polite">즐겨찾기 확인 중</span>;
  }

  if (accessToken && (meQuery.isError || favoriteStatusQuery.isError)) {
    return (
      <button
        type="button"
        onClick={() => {
          void meQuery.refetch();
          void favoriteStatusQuery.refetch();
        }}
      >
        즐겨찾기 다시 확인
      </button>
    );
  }

  const isFavorite = favoriteStatusQuery.data?.favorite ?? false;

  return (
    <button
      type="button"
      disabled={favoriteMutation.isPending}
      onClick={handleClick}
    >
      {favoriteMutation.isPending
        ? "처리 중"
        : isFavorite
          ? "북마크 해제"
          : "북마크 추가"}
    </button>
  );
}
