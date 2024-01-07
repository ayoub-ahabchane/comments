"use client";
import { onSubmit } from "@/lib/actions";
import { useInputSlice } from "@/lib/store";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
// TODO: Validator js
const InputForm = () => {
  const mode = useInputSlice((state) => state.inputMode);
  const setInputMode = useInputSlice((state) => state.setInputMode);
  const ref = useInputSlice((state) => state.inputRef);
  const payload = useInputSlice((state) => state.parentPayload);
  const formRef = useRef<HTMLFormElement>(null);
  const formStatus = useFormStatus();
  console.log(formStatus.pending);
  return (
    <form
      action={(formData) => {
        const content = formData.get("input");
        if (content === "") return;
        const onSubmitBinded = onSubmit.bind(null, mode, formData, payload);
        onSubmitBinded();
        ref.current!.value = "";
        ref.current!.blur();
        setInputMode("comment");
      }}
      ref={formRef}
      className="flex items-center gap-4"
    >
      <textarea
        name="input"
        ref={ref}
        className="flex-1 outline-none h-[20px] resize-none"
        placeholder="Add a comment"
        onKeyDown={(e) => {
          // e.preventDefault();
          if (e.key === "Enter" && !e.shiftKey) {
            formRef.current?.requestSubmit();
          }
        }}
      />
      <button className="border" type="submit" disabled={formStatus.pending}>
        Send
      </button>
    </form>
  );
};

export default InputForm;
