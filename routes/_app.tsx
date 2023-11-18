import { AppProps } from "$fresh/server.ts";
import Navbar from "../components/Navbar.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html class="bg-[#212121] text-[#fff]">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FreshMongo DataTable</title>
      </head>
      <body>
        <div className="flex">
          <Navbar />
          <Component />
        </div>
      </body>
    </html>
  );
}
