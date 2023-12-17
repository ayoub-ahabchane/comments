import DemoSignIn from "@/components/DemoSignIn";
import Post from "@/components/Post";
import {
  SignInWithGithubBtn,
  SignInWithGoogleBtn,
  SignOutBtn,
} from "@/components/auth-buttons";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Home() {
 
  return (
    <main className="h-screen">
      <div className="flex flex-col items-center h-full justify-center border">
        <Post />
        <DemoSignIn />
      </div>
    </main>
  );
}
