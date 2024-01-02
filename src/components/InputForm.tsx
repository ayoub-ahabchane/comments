import React from "react";

const InputForm = () => {
  return (
    <form action="" className="flex items-center gap-4">
      <textarea
        className="flex-1 outline-none h-[20px] resize-none"
        placeholder="Add a comment"
      />
      <button className="border">Send</button>
    </form>
  );
};

export default InputForm;
