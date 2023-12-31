"use client";
import {
  SCommentResponseInfinite,
  TCommentsResponse,
} from "@/lib/types/schemas";
import { Database } from "@/lib/types/supabase";
import { createBrowserClient } from "@supabase/ssr";
import {
  QueryFunctionContext,
  infiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import Comment from "./Comment";

const ClientComments = ({ userId }: { userId: string | undefined }) => {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const getComments = async ({ pageParam }: QueryFunctionContext) => {
    try {
      const { data, error } = await supabase
        .schema("project_comments")
        .rpc("get_comments", { _limit: 1, _cursor_timestamp: pageParam });

      if (error) throw new Error(error.message);

      return data as TCommentsResponse;
    } catch (error) {
      throw new Error("Could not execute the query.");
    }
  };

  const {
    data,
    isError,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: getComments,
    initialPageParam: null,
    getNextPageParam: (lastpage) => lastpage!.cursor,
  });

  if (isPending) return <p>Pending...</p>;
  if (isError) return <p>Cannot retrieve comments at this time.</p>;

  const validatedData = SCommentResponseInfinite.safeParse(data);
  if (validatedData.success === false)
    return <p>Could not retrieve comments.</p>;
  const pagesLength = validatedData.data.pages.length;
  return (
    <div className="flex flex-col gap-4">
      {validatedData.data.pages[0].total_count > 0 ? (
        data.pages.map((page) =>
          page.comments!.map((comment) => (
            <Comment commentData={comment} userId={userId} key={comment.id} />
          ))
        )
      ) : (
        <p>Be the first to comment!</p>
      )}
      {hasNextPage && (
        <button
          onClick={() => {
            fetchNextPage();
          }}
        >
          {isFetchingNextPage ? "boop" : "View more"}
        </button>
      )}
    </div>
  );
};

export default ClientComments;
