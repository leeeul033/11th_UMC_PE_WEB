import { authApi } from "./auth-api";

export interface Favorite {
  favoriteId: number;
  movieId: number;
}

export interface FavoriteStatus {
  movieId: number;
  favorite: boolean;
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export async function getFavorites(): Promise<Favorite[]> {
  const response = await authApi.get("favorites").json<ApiResponse<Favorite[]>>();
  return response.result;
}

export async function getFavoriteStatus(movieId: number): Promise<FavoriteStatus> {
  const response = await authApi
    .get(`favorites/${movieId}`)
    .json<ApiResponse<FavoriteStatus>>();
  return response.result;
}

export async function createFavorite(movieId: number): Promise<Favorite> {
  const response = await authApi
    .post("favorites", { json: { movieId } })
    .json<ApiResponse<Favorite>>();
  return response.result;
}

export async function deleteFavorite(movieId: number): Promise<void> {
  await authApi.delete(`favorites/${movieId}`).json<ApiResponse<null>>();
}
