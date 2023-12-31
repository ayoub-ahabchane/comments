"use client";
import {
  SRepliesResponseInfinite,
  TRepliesResponse,
} from "@/lib/types/schemas";
import { Database } from "@/lib/types/supabase";
import { createBrowserClient } from "@supabase/ssr";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import Reply from "./Reply";
import { FaEllipsis } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";

const Replies = ({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string | undefined;
}) => {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const getRepliesbyId = async ({ pageParam }: { pageParam: any }) => {
    try {
      const { data, error } = await supabase
        .schema("project_comments")
        .rpc("get_replies_by_comment_id", {
          _limit: 5,
          _comment_id: commentId,
          _cursor_timestamp: pageParam,
        });

      if (error) throw new Error(error.message);
      return (data as TRepliesResponse) || null;
    } catch (error) {
      throw new Error("Could not retrieve the replies for this comments");
    }
  };

  const options = infiniteQueryOptions({
    queryKey: ["replies", commentId],
    queryFn: getRepliesbyId,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursor,
  });

  const {
    data,
    isPending,
    isFetchingNextPage,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(options);
  const validatedReplies = SRepliesResponseInfinite.safeParse(data);

  if (isPending)
    return (
      <div className="flex items-center gap-2 text-neutral-500">
        <span className="w-10 h-px bg-neutral-300"></span>
        Loading...
      </div>
    );
  if (isError) return <p>Cannot retrieve replies at this time.</p>;
  if (validatedReplies.success === false)
    return <p>Could not retrieve replies.</p>;

  return (
    <div className="flex flex-col gap-4">
      {validatedReplies.data.pages.map((page) =>
        page.replies!.map((reply) => (
          <Reply key={reply.id} replyData={reply} userId={userId} />
        ))
      )}
      {hasNextPage && (
        <button
          onClick={() => {
            fetchNextPage();
          }}
          disabled={isPending || isFetchingNextPage}
          className="text-neutral-500 disabled:text-neutral-500 transition mx-auto px-8 py-2 flex justify-center items-center gap-1 flex-col"
        >
          {isFetchingNextPage ? (
            <>
              <FaEllipsis className="text-2xl" />
              Loading
            </>
          ) : (
            <>
              <FiPlusCircle className="text-2xl " />
              View more replies
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default Replies;
