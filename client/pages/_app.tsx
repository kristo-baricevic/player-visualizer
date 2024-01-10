import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import store from "@/src/store";
import { AudioProvider } from "../src/components/AudioPlayerContext";
import ErrorBoundary from "../src/components/ErrorBoundary";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
    <AudioProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </AudioProvider>
    </Provider>
  );
}
