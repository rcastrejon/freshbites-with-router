import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-start";

export const Route = createFileRoute("/sign-in/$")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
