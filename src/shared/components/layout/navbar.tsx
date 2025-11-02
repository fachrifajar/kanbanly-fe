import { Button, KanbanlyLogo, ModeToggle } from "@/shared/components";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6">
      <Link href="/">
        <KanbanlyLogo />
      </Link>
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="link">Log in</Button>
        </Link>
        <Link href="/register">
          <Button>Get Started Free</Button>
        </Link>

        <ModeToggle />
      </div>
    </nav>
  );
};
