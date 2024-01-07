import { RefObject, createRef } from "react";
import { create } from "zustand";
import { TComment, TReply } from "./types/schemas";
export type TInputMode = "comment" | "reply";
export type TParentPayload = TReply | TComment | undefined;

interface TInputPayload {
  inputRef: RefObject<HTMLTextAreaElement>;
  inputMode: TInputMode;
  parentPayload: TParentPayload;
  setInputMode: (newMode: TInputMode) => void;
  setParentPayload: (newPayload: TParentPayload) => void;
}

export const useInputSlice = create<TInputPayload>()((set) => {
  const inputRef = createRef<HTMLTextAreaElement>();
  return {
    inputRef,
    inputMode: "comment",
    parentPayload: undefined,
    setInputMode: (newMode: TInputMode) => set(() => ({ inputMode: newMode })),
    setParentPayload: (newPayload: TParentPayload) =>
      set(() => ({
        parentPayload: newPayload,
      })),
  };
});
