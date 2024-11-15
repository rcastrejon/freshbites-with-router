import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Icon } from "lucide-react";
import { appleCore } from "@lucide/lab";

export const Route = createFileRoute("/_shell")({
  component: ApplicationShell,
});

function ApplicationShell() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-y-auto p-2 md:p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function Header() {
  return (
    <header className="p-2 shadow-sm border-b-2 md:px-4 bg-white">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-2 md:hidden">
            <SidebarTrigger />
            <h2 className="text-2xl font-bold font-serif">
              FreshB
              <Icon iconNode={appleCore} className="inline h-5 w-5 mb-1.5" />
              tes
            </h2>
          </div>
        </div>
        <div className="flex items-center">
          <Button size="sm">Iniciar sesión</Button>
        </div>
      </div>
    </header>
  );
}
