"use client";
import {
  SCommentResponseInfinite,
  TCommentsResponse,
} from "@/lib/types/schemas";
import { createBrowserClient } from "@supabase/ssr";
import useSWRInfinite from "swr/infinite";
import Comment from "./Comment";

const ClientComments = ({ userId }: { userId: string | undefined }) => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const getKey = (pageIndex: number, previousPageData: TCommentsResponse) => {
    if (pageIndex === 0) return { _limit: 1 };

    // Return null to stop fetching if we reached the end of pages
    if (!previousPageData.cursor) return null;

    // Use the cursor from the previous page to fetch the next page
    return { _limit: 1, _cursor_timestamp: previousPageData.cursor };
  };

  const getComments = async (
    args:
      | {
          _limit: number;
          _cursor_timestamp?: undefined;
        }
      | {
          _limit: number;
          _cursor_timestamp: string;
        }
      | null
  ) => {
    const { data } = await supabase
      .schema("project_comments")
      .rpc("get_comments_test", { ...args });
    return (data as TCommentsResponse) || null;
  };

  const {
    data,
    error: swrError,
    isLoading,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(getKey, getComments);

  const validatedData = SCommentResponseInfinite.safeParse(data);
  console.log(validatedData);

  if (swrError) {
    console.log(swrError);
    return <p>Cannot retrieve comments due to an unexpected error.</p>;
  } else if (!validatedData.success) {
    console.log(validatedData.error);
    return <p>Cannot retrieve comments due to an unexpected error.</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  } else if (validatedData.data![0].comments.length === 0) {
    return <p>Start the discussion by leaving a comment!</p>;
  } else {
    return (
      <div className="flex flex-col gap-4">
        {validatedData.data!.map((page) =>
          page.comments.map((comment) => (
            <Comment userId={userId} commentData={comment} key={comment.id} />
          ))
        )}
        {validatedData.data![validatedData.data!.length - 1].cursor && (
          <button
            onClick={() => {
              setSize((size) => size + 1);
            }}
          >
            {isValidating ? "boop" : "View more"}
          </button>
        )}
      </div>
    );
  }

  return <p>data</p>;
};

export default ClientComments;
