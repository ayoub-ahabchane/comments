"use client";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const SignoutMenuItem = () => {
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
    <DropdownMenuItem className="text-base" onSelect={handleSignout}>
      SIgn out
    </DropdownMenuItem>
  );
};

export default SignoutMenuItem;
