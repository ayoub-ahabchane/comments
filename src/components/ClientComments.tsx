"use client";
import { TComment, TCommentsResponse } from "@/lib/types/schemas";
import { useState } from "react";
import Comment from "./Comment";

const ClientComments = ({
  initialLoad,
  userId,
}: {
  initialLoad: TCommentsResponse;
  userId: string | undefined;
}) => {
  const [comments, setComments] = useState(initialLoad.comments);
  const [hasMore, setHasMore] = useState(initialLoad.has_more);
  return (
    <div className="flex flex-col flex-1 gap-4">
      {comments &&
        comments.map((commentData: TComment) => (
          <Comment
            key={commentData.id}
            commentData={commentData}
            userId={userId}
          />
        ))}
      {hasMore && <button className="border">View more</button>}
    </div>
  );
};

export default ClientComments;
