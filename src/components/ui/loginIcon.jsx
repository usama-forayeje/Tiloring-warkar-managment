
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
  Bolt,
  LogOut,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function LoginIcon() {
  const authUser = useSelector((state) => state.auth);

  const getInitials = (name) => {
    const [firstName, lastName] = name.split(" ");
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  const userFullName = `${authUser?.user?.firstName} ${authUser?.user?.lastName}`;
  const userEmail = authUser?.user?.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="overflow-hidden rounded-full"
          variant="outline"
          aria-label="Open account menu"
        >
          <Avatar>
            <AvatarImage src={authUser?.user?.avatarUrl} alt={userFullName} />
            <AvatarFallback>{getInitials(userFullName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src={authUser?.user?.avatarUrl} alt={userFullName} />
            <AvatarFallback>{getInitials(userFullName)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate text-foreground">
              {userFullName}
            </span>
            <span className="text-xs font-normal truncate text-muted-foreground">
              {userEmail}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Bolt size={16} strokeWidth={2} className="opacity-60" />
            <span>Option 1</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem >
          <LogOut size={16} strokeWidth={2} className="opacity-60 " />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
