import { SReplies, TComment } from "@/lib/types/schemas";
import { createServerClient } from "@supabase/ssr";
import { DateTime } from "luxon";
import { cookies } from "next/headers";
import Image from "next/image";
import LikeButton from "./LikeButton";

const Comment = async ({
  commentData,
}: {
  commentData: TComment;
  isReply?: boolean;
}) => {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const { data, error } = await supabase.rpc("get_replies", {
  //   _parent_comment_id: commentData.id,
  // });
  // const result = SReplies.safeParse(data);
  // if (error) console.log(error);
  // if (result.success === false) console.log(result.error);

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
              <button>Reply</button>
            </div>
          </div>

          <LikeButton
            initialNumLikes={commentData.num_likes}
            initialLikeStatus={commentData.liked}
            itemId={commentData.id}
            userId={user?.id}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p>Replies maybe ?</p>
          {/* {commentData.num_replies > 0 && (
            <Replies commentId={commentData.id} />
          )} */}
          {/* VIEW MORE REPLIES */}
          {/* <div className="flex items-center gap-4">
            <span className="w-10 h-px bg-neutral-300"></span>
            <p className="text-neutral-500">View 1 more reply</p>
          </div> */}
        </div>
      </div>
    </article>
  );
};

export default Comment;
