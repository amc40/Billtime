import "@/styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { DefaultPageLayout } from "./layout/DefaultPageLayout";

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <DefaultPageLayout>
        <Component {...pageProps} />
      </DefaultPageLayout>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
