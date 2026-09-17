import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useMemo, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>

        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  console.error("Application Error:", error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          We couldn't load this page. Try again or return to the homepage.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try Again
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },

      {
        title: "Ranch Meat | Kenya's Premium Meat Marketplace",
      },

      {
        name: "description",
        content:
          "Buy premium beef, lamb and poultry directly from verified Kenyan ranches with transparent sourcing, cold-chain delivery and M-Pesa checkout.",
      },

      {
        name: "keywords",
        content:
          "Kenya meat marketplace, beef Nairobi, lamb Kenya, poultry, M-Pesa, ranch meat, farm to table",
      },

      { name: "author", content: "Ranch Meat" },

      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: "Ranch Meat | Kenya's Premium Meat Marketplace",
      },
      {
        property: "og:description",
        content: "Verified Kenyan ranches. Cold-chain delivery. M-Pesa payments.",
      },

      { property: "og:locale", content: "en_KE" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ranch Meat" },
      {
        name: "twitter:description",
        content: "Premium traceable meat delivered across Kenya.",
      },

      {
        name: "theme-color",
        content: "#111827",
      },
    ],

    links: [
      { rel: "stylesheet", href: appCss },

      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },

      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },

      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },

      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-KE">
      <head>
        <HeadContent />
      </head>

      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  const client = useMemo(() => {
    queryClient.setDefaultOptions({
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
      },

      mutations: {
        retry: 1,
      },
    });

    return queryClient;
  }, [queryClient]);

  return (
    <QueryClientProvider client={client}>
      <div className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-lg focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-primary-foreground focus-visible:shadow-lg"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main-content" className="flex-1">
          <Outlet />
        </main>

        <SiteFooter />
      </div>

      <Toaster position="bottom-right" richColors closeButton expand />
    </QueryClientProvider>
  );
}
