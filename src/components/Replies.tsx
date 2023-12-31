"use client";
import { TRepliesResponse } from "@/lib/types/schemas";
import { Database } from "@/lib/types/supabase";
import { createBrowserClient } from "@supabase/ssr";
import useSWRInfinite from "swr/infinite";

const Replies = ({ commentId }: { commentId: string }) => {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // const { data, error } = await supabase.rpc("get_replies", {
  //   _parent_comment_id: commentData.id,
  // });
  // const result = SReplies.safeParse(data);
  // if (error) console.log(error);
  // if (result.success === false) console.log(result.error);

  const getKey = (pageIndex: number, previousPageData: TRepliesResponse) => {
    // first fetch
    if (pageIndex === 0) return { _comment_id: commentId, _limit: 1 };
    // Return null to stop fetching if we reached the end of pages
    if (!previousPageData.cursor) return null;
    // Use the cursor from the previous page to fetch the next page
    return {
      _comment_id: commentId,
      _limit: 1,
      _cursor_timestamp: previousPageData.cursor,
    };
  };

  const getRepliesbyId = async (args: {
    _comment_id: string;
    _limit: number;
    _cursor_timestamp?: string;
  }) => {
    const { data, error } = await supabase
      .schema("project_comments")
      .rpc("get_replies_by_comment_id", { ...args });
    return (data as TRepliesResponse) || null;
  };

  const {
    data,
    error: swrError,
    isLoading,
    size,
    setSize,
    isValidating,
    mutate,
  } = useSWRInfinite(getKey, getRepliesbyId);
  console.log(data);
  return <div>Replies</div>;
};

export default Replies;
