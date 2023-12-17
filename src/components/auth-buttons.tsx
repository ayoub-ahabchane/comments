"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

const SignInGoogleBtn = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });
  };

  return (
    <div
      className="cursor-pointer px-2 py-1 bg-slate-950 text-slate-50 rounded-md shadow-sm"
      onClick={handleSignInWithGoogle}
    >
      Sign in with Google
    </div>
  );
};

const SignInGithubBtn = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });
  };

  return (
    <div
      className="cursor-pointer px-2 py-1 bg-slate-950 text-slate-50 rounded-md shadow-sm"
      onClick={handleSignInWithGithub}
    >
      Sign in with Github
    </div>
  );
};

const SignOutBtn = () => {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div
      className="cursor-pointer px-2 py-1 bg-slate-950 text-slate-50 rounded-md shadow-sm"
      onClick={handleSignout}
    >
      Sign out
    </div>
  );
};

export {
  SignInGithubBtn as SignInWithGithubBtn,
  SignInGoogleBtn as SignInWithGoogleBtn,
  SignOutBtn,
};
