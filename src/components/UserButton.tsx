import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import SignoutMenuItem from "./SignoutMenuItem";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UserButton = async () => {
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
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={user ? false : true}
        className="outline-offset-4"
      >
        <div className="w-10 aspect-square rounded-full bg-neutral-200">
          {user && (
            <Avatar className="bg-neutral-200">
              <AvatarImage
                src={user?.user_metadata.avatar_url}
                alt="Profile picture of ${user}"
              />
              <AvatarFallback>
                {user ? `${user.user_metadata.full_name[0].toUpperCase()}` : ""}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </DropdownMenuTrigger>
      {user && (
        <DropdownMenuContent side="left">
          <SignoutMenuItem />
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default UserButton;
