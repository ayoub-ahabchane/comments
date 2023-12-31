import { Database } from "@/lib/types/supabase";
import { createServerClient } from "@supabase/ssr";
import {
  HydrationBoundary,
  QueryClient,
  QueryFunctionContext,
  dehydrate,
} from "@tanstack/react-query";

import { cookies } from "next/headers";
import ClientComments from "./ClientComments";
import { TCommentsResponse } from "@/lib/types/schemas";

const ServerComments = async () => {
  const queryClient = new QueryClient();
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

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["comments"],
    queryFn: getComments,
    initialPageParam: null,
    getNextPageParam: (lastPage: any) => lastPage.cursor,
    staleTime: 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientComments userId={user?.id} />
    </HydrationBoundary>
  );
};

export default ServerComments;
