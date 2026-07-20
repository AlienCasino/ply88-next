import { MobileStage } from "@/design-system/patterns/mobile-stage";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-app-canvas text-foreground">
      <MobileStage>
        {children}
      </MobileStage>
    </div>
  );
}

export default AppShell;
