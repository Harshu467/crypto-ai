import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crypto Stock",
  description: "Crypto Stock Market",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <UserProvider>
        <body className={inter.className}>
          <main>{children}</main>
        </body>
      </UserProvider>
    </html>
  );
}
