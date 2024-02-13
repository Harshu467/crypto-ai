"use client";
import React, { Suspense } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const activePath = usePathname();
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Market",
      path: "/docs",
    },
    {
      name: "Trending",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact-us",
    },
  ];
  return (
    <Suspense>
      <nav className="top-0 z-10 sticky border-b border-gray-800 mx-auto bg-transparent backdrop-blur-sm">
        <div className="flex gap-[45rem] p-5 w-full ">
          <div className="item-navbar">
            <Link
              href="/"
              className="inline-flex h-10 items-start text-white rounded-lg font-extrabold text-[2rem]"
            >
              Crypto <span className="text-primary">-Stock</span>
            </Link>
          </div>

          <div className="item-navbar hidden md:block">
            <ul className="flex items-center gap-5 text-[1rem]">
              {navLinks.map((navLink) => (
                <li key={navLink.path}>
                  <Link
                    href={navLink.path}
                    className={
                      activePath === navLink.path ||
                      activePath === navLink.path + "/"
                        ? "inline-block py-2 px-3 text-center text-white hover:text-white rounded-lg"
                        : "inline-block py-2 px-3 text-center text-[grey] hover:text-white rounded-lg"
                    }
                  >
                    {navLink.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </Suspense>
  );
};

export default Navbar;
