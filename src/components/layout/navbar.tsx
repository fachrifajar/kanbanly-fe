import { Button, KanbanlyLogo, ModeToggle } from "@/components/ui";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6">
      <KanbanlyLogo />
      <div className="flex items-center gap-2">
        <Button variant="link" className="">
          <Link href="/login">Log in</Link>
        </Button>
        <Button>
          <Link href="/register">Get Started Free</Link>
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
