"use client";
import { TInputMode, useInputSlice } from "@/lib/store";
import { TComment, TReply } from "@/lib/types/schemas";

const ReplyBtn = ({ parentPayload }: { parentPayload: TComment | TReply }) => {
  const setInputMode = useInputSlice((set) => set.setInputMode);
  const setParentPayload = useInputSlice((set) => set.setParentPayload);
  const inputRef = useInputSlice((state) => state.inputRef);

  return (
    <button
      className="text-neutral-500"
      onClick={() => {
        setInputMode("reply");
        setParentPayload(parentPayload);
        inputRef.current?.focus();
      }}
    >
      Reply
    </button>
  );
};

export default ReplyBtn;
