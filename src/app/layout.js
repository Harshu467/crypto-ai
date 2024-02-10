import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { CryptoProvider } from "../context/CryptoContext";
import { StorageProvider } from "../context/StorageContext";
import { TrendingContext } from "../context/TrendingContext";
import { Toaster } from "react-hot-toast";

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
      <CryptoProvider>
        <StorageProvider>
          {/* <TrendingContext> */}
          <body className={inter.className}>{children}</body>
          {/* </TrendingContext> */}
        </StorageProvider>
      </CryptoProvider>
    </html>
  );
}
