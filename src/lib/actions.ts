"use server";

import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { z } from "zod";
import { Database } from "./types/supabase";
import { TInputMode, TParentPayload } from "./store";

export const handleLike = async (
  itemType: "comment" | "reply",
  action: "like" | "dislike",
  itemId: string
) => {
  const SCommentId = z.string().uuid();
  const vaidatedItemId = SCommentId.safeParse(itemId);

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

  switch (itemType) {
    case "comment":
      if (action === "like") {
        try {
          const { data, error } = await supabase
            .schema("project_comments")
            .from("comment_likes")
            .insert({ comment_id: itemId })
            .select("*");
          if (error) throw new Error(error.message);
          return data;
        } catch (error) {
          throw new Error("Could not like the comment.");
        }
      }
      if (action === "dislike") {
        try {
          const { data, error } = await supabase
            .schema("project_comments")
            .from("comment_likes")
            .delete()
            .eq("comment_id", itemId)
            .select("*");
          if (error) throw new Error(error.message);
          return data;
        } catch (error) {
          throw new Error("Could not unlike the reply.");
        }
      }
      break;
    case "reply":
      if (action === "like") {
        try {
          const { data, error } = await supabase
            .schema("project_comments")
            .from("reply_likes")
            .insert({ reply_id: itemId })
            .select("*");
          if (error) throw new Error(error.message);
          return data;
        } catch (error) {
          throw new Error("Could not like the reply.");
        }
      }
      if (action === "dislike") {
        try {
          const { data, error } = await supabase
            .schema("project_comments")
            .from("reply_likes")
            .delete()
            .eq("reply_id", itemId)
            .select("*");
          if (error) throw new Error(error.message);
          return data;
        } catch (error) {
          throw new Error("Could not unlike the reply.");
        }
      }
      break;
    default:
      break;
  }
};

export const onSubmit = (
  mode: TInputMode,
  formData: FormData,
  parentPayload?: TParentPayload
) => {
  if (mode === "comment") {
    console.log({
      type: "comment",
      content: formData.get("input"),
    });
  }
  if (mode === "reply") {
    console.log({
      type: "reply",
      content: formData.get("input"),
      parent: {
        id: parentPayload?.id,
        author: parentPayload?.username,
        content: parentPayload?.content,
      },
    });
  }
};
