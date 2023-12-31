"use server";

import { createServerClient, CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { z } from "zod";
import { Database } from "./types/supabase";

const handleLike = async (type: "like" | "dislike", commentId: string) => {
  const SCommentId = z.string().uuid();
  const validatedCommentId = SCommentId.safeParse(commentId);

  const cookieStore = cookies();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  const { data, error } = await supabase
    .schema("project_comments")
    .from("comment_likes")
    .insert({ comment_id: commentId })
    .select("*");

  if (error) throw new Error(error.message);
  return data;
};

export { handleLike };
