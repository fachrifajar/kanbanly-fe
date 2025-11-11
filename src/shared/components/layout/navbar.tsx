"use client";

import { usePathname } from "next/navigation";
import { isAuthRoute } from "@/shared/utils";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  Button,
  KanbanlyLogo,
  ModeToggle,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/shared/components";
import Link from "next/link";
import { CircleUserRound, LogOut, Settings, User } from "lucide-react";
import { useLogoutMutation } from "@/features/auth/api/logout.mutation";
import { LoadingBackdrop } from "@/shared/components";

export const Navbar = () => {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = !!user;
  const shouldShowGuestUI = isAuthRoute(pathname);

  const { mutate, isPending } = useLogoutMutation();

  if (isPending) {
    return <LoadingBackdrop open />;
  }

  return (
    <nav className="flex items-center justify-between py-4 px-6">
      <Link href="/">
        <KanbanlyLogo />
      </Link>

      <div className="flex items-center gap-2">
        {shouldShowGuestUI ? (
          <>
            <Link href="/login">
              <Button variant="link">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started Free</Button>
            </Link>
            <ModeToggle />
          </>
        ) : isAuthenticated ? (
          <>
            {/* === MENUBAR === */}
            <Menubar className="border-none shadow-none">
              <MenubarMenu>
                <MenubarTrigger className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-md cursor-pointer">
                  <CircleUserRound className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm font-medium">
                    {user.username}
                  </span>
                </MenubarTrigger>

                <MenubarContent align="end" className="min-w-[180px]">
                  <div className="px-3 py-2 text-xs text-muted-foreground">
                    Signed in as:
                    <div className="font-medium text-foreground truncate">
                      {user.email}
                    </div>
                  </div>

                  <MenubarSeparator />

                  <MenubarItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" /> Profile
                    </Link>
                  </MenubarItem>

                  <MenubarItem asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" /> Settings
                    </Link>
                  </MenubarItem>

                  <MenubarSeparator />

                  <MenubarItem
                    onClick={() => mutate()}
                    className="text-red-600 focus:text-red-600 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <ModeToggle />
          </>
        ) : (
          <>
            {/* fallback sebelum hydration */}
            <ModeToggle />
          </>
        )}
      </div>
    </nav>
  );
};
