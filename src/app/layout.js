import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { UserProvider } from "@/context/UserContext";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

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
        <meta name="google-adsense-account" content="ca-pub-4866836342494252" />
      </Head>
      <Script
        id="Google Analytics"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-3QG0LVP0DK"
      />
      <Script
        id="Google Adsense"
        crossorigin="anonymous"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4866836342494252"
      />
      <Script
        id="amp-auto-ads"
        custom-element="amp-auto-ads"
        async
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
      ></Script>
      <Script id="Google Analytics " strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3QG0LVP0DK');
         `}
      </Script>
      <Script strategy="lazyOnload" id="clarity-script">
        {`
           (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "lecnxhvogt");
        `}
      </Script>
      <UserProvider>
        <body className={inter.className}>
          <amp-auto-ads
            type="adsense"
            data-ad-client="ca-pub-4866836342494252"
          ></amp-auto-ads>
          {children}
          <Analytics />
        </body>
      </UserProvider>
    </html>
  );
}
