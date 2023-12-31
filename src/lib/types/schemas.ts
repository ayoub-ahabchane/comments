import { z } from "zod";

const noUrlRegex =
  /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;

const ScleanText = z.string().refine((value) => !noUrlRegex.test(value), {
  message: "Input should not contain links.",
});

export const SComment = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime({ offset: true }),
  content: z.string(ScleanText),
  author_id: z.string().uuid(),
  username: z.string(),
  avatar_url: z.string().url(),
  num_likes: z.number(),
  num_replies: z.number(),
  liked: z.boolean(),
});
export const SComments = z.union([z.array(SComment), z.undefined()]);

const SReply = z.object({
  id: z.string().uuid(),
  comment_id: z.string().uuid(),
  created_at: z.string().datetime({ offset: true }),
  content: z.string(ScleanText),
  author_id: z.string().uuid(),
  username: z.string(),
  avatar_url: z.string().url(),
  num_likes: z.number(),
  liked: z.boolean(),
});

export const SReplies = z.union([z.array(SReply), z.null()]);

export const SRepliesResponse = z.object({
  replies: SReplies,
  cursor: z.string().datetime().nullable(),
  total_count: z.number(),
});

export const SCommentsResponse = z.object({
  comments: SComments,
  cursor: z.string().nullable(),
  total_count: z.number(),
});

export const SCommentResponseInfinite = z.object({
  pages: z.array(SCommentsResponse),
  pageParams: z.array(z.union([z.string(), z.null()])),
});

export const SRepliesResponseInfinite = z.object({
  pages: z.array(SRepliesResponse),
  pageParams: z.array(z.union([z.string(), z.null()])),
});
export type TComment = z.infer<typeof SComment>;
export type TComments = z.infer<typeof SComments>;
export type TReply = z.infer<typeof SReply>;
export type TReplies = z.infer<typeof SReplies>;
export type TRepliesResponse = z.infer<typeof SRepliesResponse>;
export type TCommentsResponse = z.infer<typeof SCommentsResponse>;
export type TCommentsResponseInfinite = z.infer<
  typeof SCommentResponseInfinite
>;
export type TRepliesResponseInfinite = z.infer<typeof SRepliesResponseInfinite>;
