"use client";

import { handleLike } from "@/lib/actions";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";

const LikeButton = ({
  itemId,
  userId,
  initialLikeStatus,
  initialNumLikes,
}: {
  itemId: string;
  userId: string | undefined;
  initialLikeStatus: boolean;
  initialNumLikes: number;
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(initialLikeStatus);
  const [numLikes, setNumLikes] = useState<number>(initialNumLikes);

  // const handleClick = async () => {
  //   if (!userId) return;
  //   debouncedLike();
  //   if (isLiked) {
  //     setNumLikes((prev) => prev - 1);
  //     setIsLiked(false);
  //   } else {
  //     setNumLikes((prev) => prev + 1);
  //     setIsLiked(true);
  //   }
  // };

  // const debouncedLike = useDebouncedCallback(() => {
  //   const currentLikeStatus = isLiked;
  //   const action = isLiked ? "dislike" : "like";
  //   try {
  //     handleLike(action, itemId);
  //   } catch (error) {
  //     setIsLiked(currentLikeStatus);
  //     setNumLikes((prev) => (currentLikeStatus ? prev - 1 : prev + 1));
  //     console.error(error);
  //   }
  // }, 200);

  return (
    <div className="flex flex-col items-center gap-1 text-neutral-500">
      <button
        className="cursor-pointer"
        title="Like"
        onClick={() => {
          console.log("boop!");
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
