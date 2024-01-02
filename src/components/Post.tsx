import ActionBar from "./ActionBar";
import ServerComments from "./ServerComments";

const Post = async () => {
  return (
    <div className="rounded-xl shadow h-[40rem] w-full max-w-[25rem] flex flex-col">
      <div className="w-full max-w-[25rem] bg-white rounded-xl flex-1 flex flex-col">
        <ServerComments />
        <ActionBar />
      </div>
    </div>
  );
};

export default Post;
