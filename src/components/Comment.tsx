import { TComment } from "@/lib/types/schemas";
import { DateTime } from "luxon";
import Image from "next/image";
import { useState } from "react";
import LikeButton from "./LikeButton";
import Replies from "./Replies";
import ReplyBtn from "./ReplyBtn";

const Comment = ({
  commentData,
  userId,
}: {
  commentData: TComment;
  userId: string | undefined;
}) => {
  const [isRepliesExpanded, setIsExpanded] = useState(false);
  const formattedCommentDate = DateTime.fromISO(commentData.created_at)
    .toRelative({ style: "short" })!
    .replace(/(\d+)\s*([a-zA-Z]).*/, "$1$2");
  return (
    <article className="grid grid-flow-col grid-cols-[min-content_auto] gap-x-4">
      <div className="aspect-square w-10 rounded-full bg-neutral-200">
        <Image
          alt={`profile picture of ${commentData.username}`}
          src={commentData.avatar_url}
          width={40}
          height={40}
          className="rounded-full bg-neutral-200"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[auto_min-content] gap-x-4">
          <div className="flex flex-col gap-2">
            <p className="flex gap-1 items-baseline font-semibold">
              <span>{commentData.username}</span>
              <span className="text-xs text-neutral-500">
                {formattedCommentDate}
              </span>
            </p>
            <p>{commentData.content}</p>
            <div className="text-neutral-500">
              <ReplyBtn parentPayload={commentData} />
            </div>
          </div>

          <LikeButton
            userId={userId}
            itemType="comment"
            initialNumLikes={commentData.num_likes}
            initialLikeStatus={commentData.liked}
            itemId={commentData.id}
          />
        </div>

        {commentData.num_replies > 0 && isRepliesExpanded && (
          <Replies commentId={commentData.id} userId={userId} />
        )}
        {commentData.num_replies > 0 && !isRepliesExpanded && (
          <div className="flex items-center gap-2">
            <span className="w-10 h-px bg-neutral-300"></span>
            <button
              className="text-neutral-500"
              onClick={() => {
                setIsExpanded(true);
              }}
            >
              {commentData.num_replies} repl
              {commentData.num_replies > 1 ? "ies" : "y"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default Comment;
