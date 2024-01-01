"use client";

import { handleLike } from "@/lib/actions";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";

const LikeButton = ({
  itemType,
  userId,
  itemId,
  initialLikeStatus,
  initialNumLikes,
}: {
  itemType: "comment" | "reply";
  userId: string | undefined;
  itemId: string;
  initialLikeStatus: boolean;
  initialNumLikes: number;
}) => {
  const [isLiked, setIsLiked] = useState(initialLikeStatus);
  const [numLikes, setNumLikes] = useState(initialNumLikes);
  const initialLikeStatusRef = useRef<"like" | "dislike" | null>(null);
  const nextAction = isLiked ? "dislike" : "like";
  const mutation = useMutation({
    mutationFn: (newAction: "like" | "dislike") =>
      handleLike(itemType, newAction, itemId),
  });

  const handleDebouncedLike = useDebouncedCallback(
    (action: "dislike" | "like") => {
      if (action !== initialLikeStatusRef.current) {
        mutation.mutate(action);
      }
      initialLikeStatusRef.current = null;
    },
    2000
  );

  const title = !userId
    ? "Wanna leave a like? Sign in first!"
    : itemType === "comment"
      ? nextAction === "like"
        ? "Like this comment"
        : "Unlike this comment"
      : nextAction === "like"
        ? "Like this reply"
        : "Unlike this reply";
  return (
    <div className="flex flex-col items-center gap-1 text-neutral-500">
      <button
        className="cursor-pointer disabled:cursor-default"
        title={title}
        onClick={() => {
          if (!userId) return;
          if (initialLikeStatusRef.current === null) {
            initialLikeStatusRef.current =
              nextAction === "dislike" ? "like" : "dislike";
          }
          setIsLiked((prev) => !prev);
          setNumLikes((prev) => (isLiked ? prev - 1 : prev + 1));
          handleDebouncedLike(nextAction);
        }}
      >
        {isLiked ? (
          <FaHeart className="text-base text-pink-600" />
        ) : (
          <FaRegHeart className="text-base" />
        )}
      </button>
      {numLikes > 0 && (
        <span className="font-semibold text-xs">{numLikes}</span>
      )}
    </div>
  );
};

export default LikeButton;
