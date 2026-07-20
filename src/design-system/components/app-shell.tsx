import { MobileStage } from "@/design-system/patterns/mobile-stage";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-app-canvas text-foreground">
      <MobileStage>
        {children}
      </MobileStage>
    </div>
  );
}

export default AppShell;
