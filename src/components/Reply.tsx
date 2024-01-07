import React from "react";
import LikeButton from "./LikeButton";
import { TReply } from "@/lib/types/schemas";
import Image from "next/image";
import { DateTime } from "luxon";
import ReplyBtn from "./ReplyBtn";

const Reply = ({
  replyData,
  userId,
}: {
  replyData: TReply;
  userId: string | undefined;
}) => {
  const formattedReplytDate = DateTime.fromISO(replyData.created_at)
    .toRelative({ style: "short" })!
    .replace(/(\d+)\s*([a-zA-Z]).*/, "$1$2");

  return (
    <article className="grid grid-flow-col grid-cols-[min-content_auto] gap-x-4">
      <div className="aspect-square w-10 rounded-full bg-neutral-200">
        <Image
          alt={`profile picture of ${replyData.username}`}
          src={replyData.avatar_url}
          width={40}
          height={40}
          className="rounded-full bg-neutral-200"
        />
      </div>
      <div className="grid grid-cols-[auto_min-content] gap-x-4">
        <div className="flex flex-col gap-2">
          <p className="flex gap-1 items-baseline font-semibold">
            <span>{replyData.username}</span>
            <span className="text-xs text-neutral-500">
              {formattedReplytDate}
            </span>
          </p>
          <p>{replyData.content}</p>
          <div className="text-neutral-500">
            <ReplyBtn parentPayload={replyData} />
          </div>
        </div>

        <LikeButton
          userId={userId}
          itemType="reply"
          initialNumLikes={replyData.num_likes}
          initialLikeStatus={replyData.liked}
          itemId={replyData.id}
        />
      </div>
    </article>
  );
};

export default Reply;
