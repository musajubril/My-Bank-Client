import '../styles/globals.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ToastProvider } from 'react-toast-notifications';
import { AnimatePresence } from 'framer-motion';

// import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient();
if (typeof document === "undefined") {
  // @ts-ignore global.document = { querySelector: function () {}, };
}
function MyApp({ Component, pageProps }) {

  return (
    <ToastProvider>
    <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
        <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
            >
      <Component {...pageProps} />
      </AnimatePresence>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </Hydrate>
      </QueryClientProvider>
    </ToastProvider>
  )
}

export default MyApp
