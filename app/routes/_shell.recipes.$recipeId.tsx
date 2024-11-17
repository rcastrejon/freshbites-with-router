import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { z } from "zod";
import recipes from "@/lib/db/recipes.json";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VerifiedBadge } from "@/components/recipe-card";

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
    <div className="space-y-4">
      <div className="grid items-start gap-4 md:grid-cols-2">
        <div
          className="relative aspect-square shadow-lg"
          style={{
            viewTransitionName: `image-${recipe.id}`,
          }}
        >
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            loading="eager"
            className="h-full w-full rounded-lg object-cover"
          />
          <VerifiedBadge isVerified={recipe.verifiedAt !== null} />
        </div>
        <div className="space-y-3">
          <h1 className="font-serif text-3xl font-bold">{recipe.title}</h1>
          <p>{recipe.description}</p>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl font-semibold">
              Ingredients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-foreground"></div>
                  {ingredient}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl font-semibold">
              Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-foreground">
                    {index + 1}
                  </span>
                  <p>{instruction}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
