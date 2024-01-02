import DemoSignIn from "@/components/DemoSignIn";
import Post from "@/components/Post";

export default async function Home() {
  return (
    <main className="h-screen">
      <div className="flex flex-col items-center h-full justify-center gap-4 m-4">
        <Post />
        <DemoSignIn />
      </div>
    </main>
  );
}
