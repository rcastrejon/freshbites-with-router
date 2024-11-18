import { NewRecipeSheet } from "@/components/new-recipe";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_shell/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <NewRecipeSheet />
    </div>
  );
}
