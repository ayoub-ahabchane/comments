import { SCommentsResponse } from "@/lib/types/schemas";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import ClientComments from "./ClientComments";

const ServerComments = async () => {
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

  const { data, error } = await supabase
    .schema("project_comments")
    .rpc("get_comments_test", { _limit: 1 });
  // console.log(data.comments);
  const result = SCommentsResponse.safeParse(data);

  if (error || result.success === false) {
    console.log(error);
    console.log(result);
    return <p>Could not retrieve comments. Try again.</p>;
  } else {
    return <ClientComments initialLoad={result.data} userId={user?.id} />;
  }
};
export default ServerComments;
