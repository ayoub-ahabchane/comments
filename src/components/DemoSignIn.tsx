import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Image from "next/image";
import {
  SignInWithGithubBtn,
  SignInWithGoogleBtn,
  SignOutBtn,
} from "./auth-buttons";

const DemoSignIn = async () => {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex items-center justify-center gap-2">
      {user ? (
        <>
          <Image
            alt={`profile picture of ${user.user_metadata.user_name} sr`}
            src={user.user_metadata.avatar_url}
            width={26}
            height={26}
            className="rounded-full"
          />
          <SignOutBtn />
        </>
      ) : (
        <>
          <SignInWithGoogleBtn /> <SignInWithGithubBtn />
        </>
      )}
    </div>
  );
};

export default DemoSignIn;
