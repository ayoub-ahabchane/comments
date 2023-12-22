import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import ClientComments from "./ClientComments";

const Post = async () => {
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

  return (
    <div className="rounded-xl shadow h-[40rem] w-full max-w-[25rem] flex flex-col">
      <div className="py-6 px-6 w-full max-w-[25rem] bg-white rounded-xl flex-1 flex flex-col">
        {/* <ServerComments /> */}
        <ClientComments userId={user?.id} />
      </div>
    </div>
  );
};

export default Post;
