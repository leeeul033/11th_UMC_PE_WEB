import { apiClient } from "./api-client";
import { authApi } from "./auth-api";

export interface Rating {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRatingRequest {
  movieId: number;
  score: number;
  comment: string;
}

export interface UpdateRatingRequest {
  score: number;
  comment: string;
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export function getMemberRatings(memberId: number) {
  return apiClient.get(`members/${memberId}/ratings`).json<Rating[]>();
}

export async function createRating(body: CreateRatingRequest): Promise<Rating> {
  const response = await authApi
    .post("ratings", { json: body })
    .json<ApiResponse<Rating>>();
  return response.result;
}

export async function updateRating(
  ratingId: number,
  body: UpdateRatingRequest,
): Promise<Rating> {
  const response = await authApi
    .patch(`ratings/${ratingId}`, { json: body })
    .json<ApiResponse<Rating>>();
  return response.result;
}

export async function deleteRating(ratingId: number): Promise<void> {
  await authApi.delete(`ratings/${ratingId}`).json<ApiResponse<null>>();
}
