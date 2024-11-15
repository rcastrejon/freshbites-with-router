import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_shell/")({
  component: HomePage,
});

function HomePage() {
  return <div>Hola, mundo!</div>;
}
