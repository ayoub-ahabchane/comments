"use client";
import { TRepliesResponse } from "@/lib/types/schemas";
import { Database } from "@/lib/types/supabase";
import { createBrowserClient } from "@supabase/ssr";

const Replies = ({ commentId }: { commentId: string }) => {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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

  return <div>Replies</div>;
};

export default Replies;
