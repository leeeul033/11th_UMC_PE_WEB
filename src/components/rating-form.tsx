import { useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/members/me";
import { getMemberRatings } from "../api/ratings";
import {
  useCreateRatingMutation,
  useDeleteRatingMutation,
  useUpdateRatingMutation,
} from "../hooks/use-rating-mutations";
import { useAuthStore } from "../stores/auth-store";

interface RatingFormProps {
  movieId: number;
}

export function RatingForm({ movieId }: RatingFormProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [draft, setDraft] = useState<{
    ratingId: number | null;
    score: number;
    comment: string;
  } | null>(null);
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const memberId = meQuery.data?.memberId;
  const ratingsQuery = useQuery({
    queryKey: ["members", memberId, "ratings"],
    queryFn: () => getMemberRatings(memberId as number),
    enabled: Boolean(accessToken && memberId),
    retry: false,
  });
  const currentRating = ratingsQuery.data?.find((rating) => rating.movieId === movieId);
  const currentRatingId = currentRating?.ratingId ?? null;
  const score =
    draft?.ratingId === currentRatingId ? draft.score : currentRating?.score ?? 5;
  const comment =
    draft?.ratingId === currentRatingId
      ? draft.comment
      : currentRating?.comment ?? "";
  const createMutation = useCreateRatingMutation(memberId ?? 0);
  const updateMutation = useUpdateRatingMutation(memberId ?? 0);
  const deleteMutation = useDeleteRatingMutation(memberId ?? 0);
  const isPending =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;
  const isValid = Number.isInteger(score) && score >= 1 && score <= 5 && comment.length <= 500;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!memberId || !isValid || isPending) return;

    const body = { score, comment };

    if (currentRating) {
      updateMutation.mutate({ ratingId: currentRating.ratingId, body });
    } else {
      createMutation.mutate({ movieId, ...body });
    }
  };

  if (!accessToken) {
    return (
      <button
        type="button"
        onClick={() => alert("평점은 로그인 후 등록할 수 있어요.")}
        className="text-sm text-gray-300 underline"
      >
        로그인 후 평점을 등록할 수 있어요.
      </button>
    );
  }

  if (meQuery.isPending || ratingsQuery.isPending) {
    return <p className="text-sm text-gray-300">내 평점을 불러오는 중이에요.</p>;
  }

  if (meQuery.isError || ratingsQuery.isError || !memberId) {
    return (
      <div className="text-sm text-red-300">
        <p>내 평점을 불러오지 못했어요.</p>
        <button
          type="button"
          onClick={() => {
            void meQuery.refetch();
            void ratingsQuery.refetch();
          }}
          className="mt-2 underline"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm font-semibold text-gray-200">
        별점
        <select
          value={score}
          disabled={isPending}
          onChange={(event) =>
            setDraft({
              ratingId: currentRatingId,
              score: Number(event.target.value),
              comment,
            })
          }
          className="rounded border border-gray-500 bg-gray-800 p-2 text-white disabled:opacity-50"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>{value}점</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm font-semibold text-gray-200">
        후기 <span className="font-normal text-gray-400">(선택, 최대 500자)</span>
        <textarea
          value={comment}
          maxLength={500}
          disabled={isPending}
          onChange={(event) =>
            setDraft({
              ratingId: currentRatingId,
              score,
              comment: event.target.value,
            })
          }
          className="min-h-24 rounded border border-gray-500 bg-gray-800 p-2 text-white disabled:opacity-50"
        />
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!isValid || isPending}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {isPending ? "저장 중" : currentRating ? "평점 수정" : "평점 등록"}
        </button>
        {currentRating && (
          <button
            type="button"
            disabled={isPending}
            onClick={() => deleteMutation.mutate(currentRating.ratingId)}
            className="rounded border border-red-400 px-4 py-2 text-sm font-semibold text-red-200 disabled:opacity-50"
          >
            평점 삭제
          </button>
        )}
      </div>
    </form>
  );
}
