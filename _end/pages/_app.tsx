import NavLink from "@/components/nav-link";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <header className="space-x-4 p-4 text-sm text-gray-500">
        <NavLink
          activeClassName="text-gray-900 underline"
          inactiveClassName="text-gray-500 hover:text-gray-900"
          className="font-medium"
          href="/1"
        >
          Issue 1
        </NavLink>
        <NavLink
          activeClassName="text-gray-900 underline"
          inactiveClassName="text-gray-500 hover:text-gray-900"
          className="font-medium"
          href="/2"
        >
          Issue 2
        </NavLink>
      </header>

      <div className="mt-4 max-w-lg px-4" key={pageProps.issue.id}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
