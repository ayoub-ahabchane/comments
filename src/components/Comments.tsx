import { SComments } from "@/lib/types/schemas";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Comment from "./Comment";

const Comments = async () => {
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

  const { data, error } = await supabase
    .schema("project_comments")
    .rpc("get_comments");

  const result = SComments.safeParse(data);

  if (error || result.success === false) {
    return <p>Could not retrieve comments. Try again.</p>;
  } else {
    return (
      <div className="py-6 px-6 w-full max-w-[25rem] bg-white rounded-xl flex-1 flex flex-col">
        <div className="flex flex-col flex-1 gap-4">
          {result.success &&
            result.data.map((commentData) => (
              <Comment key={commentData.id} commentData={commentData} />
            ))}
        </div>
      </div>
    );
  }
};
export default Comments;
