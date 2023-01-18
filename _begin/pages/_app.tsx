import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <header>
        <Link href="/1">Issue 1</Link>
        <Link href="/2">Issue 2</Link>
      </header>
      <Component {...pageProps} />
    </div>
  );
}
