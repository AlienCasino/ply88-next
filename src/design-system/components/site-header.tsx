import Link from "next/link";
import { Menu } from "lucide-react";
import { routes } from "@/core/constants/routes";
import { Button } from "@/design-system/primitives/button";
import { BrandMark } from "@/design-system/components/brand-mark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-app-header-border bg-app-header px-3 py-3">
      <div className="grid h-12 grid-cols-[44px_1fr_auto] items-center gap-3">
        <Button
          aria-label="Open menu"
          variant="ghost"
          size="icon"
          className="text-nav-muted hover:text-foreground"
        >
          <Menu />
        </Button>
        <div className="flex min-w-0 justify-start">
          <BrandMark />
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={routes.login}>Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={routes.register}>Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
