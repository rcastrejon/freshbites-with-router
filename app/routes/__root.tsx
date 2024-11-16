// app/routes/__root.tsx
import { createRootRouteWithContext } from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import * as React from "react";
import tailwind from "../app.css?url";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
    },
    {
      title: "FreshBites",
    },
    {
      name: "description",
      content:
        "FreshBites es la plataforma definitiva diseñada específicamente para estudiantes universitarios que buscan cocinar de manera inteligente, saludable y económica.",
    },
  ],
  links: () => [{ rel: "stylesheet", href: tailwind }],
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <React.Suspense>
          <TanStackRouterDevtools position="bottom-right" />
        </React.Suspense>
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </body>
    </html>
  );
}
