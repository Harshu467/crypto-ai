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
      path: "/market",
    },
    {
      name: "Trending",
      path: "/trending",
    },
  ];
  return (
    <Suspense>
      <nav className="top-0 z-10 sticky border-b border-gray-800 mx-auto bg-transparent backdrop-blur-sm">
        <div className="flex gap-[45rem] p-5 w-full justify-between">
          <div className="item-navbar ml-[16px]">
            <Link
              href="/"
              className="inline-flex h-10 items-start text-white rounded-lg font-extrabold text-[2rem]"
            >
              Crypto
            </Link>
          </div>

          <div className="item-navbar flex-row md:flex hidden">
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
            <ul className="ml-[2rem]">
              <div
                className={`w-[40px] select-none h-[40px] bg-white cursor-pointer border-[1px] rounded-full flex border items-center justify-center }`}
              >
                <span className="text-[18px] select-none cursor-pointer bg-center font-medium">
                  H
                </span>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </Suspense>
  );
};

export default Navbar;
