import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFavorite,
  deleteFavorite,
  type Favorite,
  type FavoriteStatus,
} from "../api/favorites";

interface FavoriteMutationVariables {
  memberId: number;
  movieId: number;
  isFavorite: boolean;
}

export function useFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ movieId, isFavorite }: FavoriteMutationVariables) =>
      isFavorite ? deleteFavorite(movieId) : createFavorite(movieId),
    onSuccess: (createdFavorite, { memberId, movieId, isFavorite }) => {
      const statusKey = ["members", memberId, "favorites", "status", movieId];
      const listKey = ["members", memberId, "favorites"];
      const favorite = !isFavorite;

      queryClient.setQueryData<FavoriteStatus>(statusKey, { movieId, favorite });
      queryClient.setQueryData<Favorite[]>(listKey, (previous) => {
        if (!previous) return previous;

        return favorite
          ? [createdFavorite as Favorite, ...previous]
          : previous.filter((item) => item.movieId !== movieId);
      });

      alert(favorite ? "즐겨찾기에 추가했어요." : "즐겨찾기를 해제했어요.");
    },
    onError: () => {
      alert("즐겨찾기 변경에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
