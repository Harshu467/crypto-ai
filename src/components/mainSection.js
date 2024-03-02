"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function MainSection({ children }) {
  return (
    <main className={`${inter.className}`}>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Inter", sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      {children}
    </main>
  );
}
