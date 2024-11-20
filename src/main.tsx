import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";

import "@/styles/tailwind.css";

import AppContainer from "./AppContainer.tsx";

const { VITE_SENTRY_DNS, MODE } = import.meta.env;

Sentry.init({
  dsn: VITE_SENTRY_DNS,
  release: "0.0.1",
  environment: "dev",
  maxBreadcrumbs: 10,
  integrations: [
    Sentry.breadcrumbsIntegration({
      console: true,
      fetch: true,
    }),
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(), // 리플레이 저장
  ],
  beforeSend: function (event) {
    // development
    if (MODE === "development") return;
    // production
    return event;
  },
  ignoreErrors: [/AxiosError/i],
  // Tracing
  tracesSampleRate: 0.6, //  Capture 60% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost"],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 0.1, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 0, gcTime: 0, throwOnError: true, retry: 0 },
  },
});

async function enableMocking() {
  const { worker } = await import("@/api/mocks/browser.ts");

  return worker.start({ onUnhandledRequest: "bypass" });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppContainer />
      </QueryClientProvider>
    </StrictMode>
  );
});
