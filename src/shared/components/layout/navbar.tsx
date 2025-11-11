"use client";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { Button, KanbanlyLogo, ModeToggle } from "@/shared/components";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";

export const Navbar = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());

  return (
    <nav className="flex items-center justify-between py-4 px-6">
      <Link href="/">
        <KanbanlyLogo />
      </Link>

      <div className="flex items-center gap-2">
        {!isAuthenticated ? (
          <>
            <Link href="/login">
              <Button variant="link">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started Free</Button>
            </Link>
            <ModeToggle />
          </>
        ) : (
          <>
            <CircleUserRound />
            <ModeToggle />
          </>
        )}
      </div>
    </nav>
  );
};