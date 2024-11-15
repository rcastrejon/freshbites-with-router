import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { z } from "zod";
import recipes from "@/lib/db/recipes.json";

const getRecipeSchema = z.object({
  recipeId: z.string().min(1),
});

const getRecipe = createServerFn()
  .validator(getRecipeSchema)
  .handler(async ({ data }) => {
    // fake delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return recipes.find((recipe) => recipe.id === data.recipeId);
  });

export const Route = createFileRoute("/_shell/recipes/$recipeId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const recipe = await getRecipe({ data: params });
    if (!recipe) {
      throw notFound();
    }
    return { recipe };
  },
});

function RouteComponent() {
  const { recipe } = Route.useLoaderData();

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
    </div>
  );
}
