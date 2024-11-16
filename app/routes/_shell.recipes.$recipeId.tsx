import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { z } from "zod";
import recipes from "@/lib/db/recipes.json";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

const getRecipeSchema = z.object({
  recipeId: z.string().min(1),
});

const getRecipe = createServerFn()
  .validator(getRecipeSchema)
  .handler(async ({ data }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const recipe = recipes.find((recipe) => recipe.id === data.recipeId);
    if (!recipe) {
      throw notFound();
    }
    return recipe;
  });

const recipeQueryOptions = (recipeId: string) =>
  queryOptions({
    queryKey: ["recipe", recipeId],
    queryFn: () => getRecipe({ data: { recipeId } }),
  });

export const Route = createFileRoute("/_shell/recipes/$recipeId")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.prefetchQuery(
      recipeQueryOptions(params.recipeId),
    );
  },
});

function RouteComponent() {
  const { recipeId } = Route.useParams();
  const { data: recipe } = useSuspenseQuery(recipeQueryOptions(recipeId));

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
    </div>
  );
}
