import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { UserProvider } from "@/context/UserContext";
import { Analytics } from "@vercel/analytics/react";

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
    // Google Analytics
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-3QG0LVP0DK"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-3QG0LVP0DK');
            `
          }}
        />
    // Clarity
          <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
             (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "lecnxhvogt");
            `
          }}
        />
      </Head>
      <UserProvider>
        <body className={inter.className}>
          {children}
          <Analytics />
        </body>
      </UserProvider>
    </html>
  );
}
