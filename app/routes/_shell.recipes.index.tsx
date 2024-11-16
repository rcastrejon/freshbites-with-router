import { createFileRoute, Link } from "@tanstack/react-router";
import recipes from "@/lib/db/recipes.json";
import { createServerFn } from "@tanstack/start";
import { RecipeCard } from "@/components/recipe-card";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

const getRecipesSchema = z.object({
  page: z.number().int().positive(),
});

const getRecipes = createServerFn()
  .validator(getRecipesSchema)
  .handler(async ({ data }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const PAGE_SIZE = 8;

    const start = (data.page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const totalPages = Math.ceil(recipes.length / PAGE_SIZE);

    return {
      recipes: recipes.slice(start, end),
      pagination: {
        totalPages,
        hasPreviousPage: data.page > 1,
        hasNextPage: data.page < totalPages,
      },
    };
  });

const recipesQueryOptions = (page: number) =>
  queryOptions({
    queryKey: ["recipes", page],
    queryFn: () => getRecipes({ data: { page } }),
  });

export const Route = createFileRoute("/_shell/recipes/")({
  validateSearch: z.object({
    page: z.number().int().positive().catch(1),
  }),
  loaderDeps: ({ search: { page } }) => ({ page }),
  component: RouteComponent,
  loader: async ({ context, deps }) => {
    await context.queryClient.prefetchQuery(recipesQueryOptions(deps.page));
  },
});

function RouteComponent() {
  const { page } = Route.useLoaderDeps();
  const {
    data: {
      recipes,
      pagination: { hasPreviousPage, hasNextPage },
    },
  } = useSuspenseQuery(recipesQueryOptions(page));

  return (
    <div>
      <h3 className="mb-3 border-b-2 border-b-foreground pb-1 font-serif text-2xl font-bold">
        Recetas
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div className="grid grid-cols-2 pt-3">
        <div className="col-start-1 justify-self-start">
          {hasPreviousPage && (
            <Button variant="link" asChild>
              <Link
                to="/recipes"
                resetScroll={false}
                search={{ page: page - 1 }}
              >
                <ChevronLeft className="h-4 w-4" />
                Atrás
              </Link>
            </Button>
          )}
        </div>
        <div className="col-start-2 justify-self-end">
          {hasNextPage && (
            <Button variant="link" asChild>
              <Link
                to="/recipes"
                resetScroll={false}
                search={{ page: page + 1 }}
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
