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
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/tanstack-start";
import { SearchInput } from "@/components/search";

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
    <header className="border-b-2 bg-white p-2 shadow-sm md:px-4">
      <div className="grid h-8 grid-cols-[1fr,_max-fit,_1fr]">
        <div className="col-start-1 flex items-center gap-2 md:hidden">
          <SidebarTrigger />
          <h2 className="font-serif text-2xl font-bold">
            FreshB
            <Icon iconNode={appleCore} className="mb-1.5 inline h-5 w-5" />
            tes
          </h2>
        </div>
        <div className="col-start-2 hidden md:block">
          <SearchInput />
        </div>
        <div className="col-start-3 flex items-center gap-2 justify-self-end">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button size="sm" asChild>
              <SignInButton
                forceRedirectUrl={Route.path}
                signUpForceRedirectUrl={Route.path}
              >
                Iniciar sesión
              </SignInButton>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
