import InputForm from "./InputForm";
import UserButton from "./UserButton";

const ActionBar = async () => {
  return (
    <div className="p-6 flex gap-4 items-center border-t-neutral-300 border">
      <UserButton />
      <InputForm />
    </div>
  );
};

export default ActionBar;
