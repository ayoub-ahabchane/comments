import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import React from "react";
import ClientComments from "./ClientComments";
import { Database } from "@/lib/types/supabase";
import { TCommentsResponse } from "@/lib/types/schemas";

const ServerComments = async () => {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
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

  //TODO: Zod validation
  return (
    <ClientComments
      initialLoad={data as TCommentsResponse | undefined}
      userId={user?.id}
    />
  );
};

export default ServerComments;
