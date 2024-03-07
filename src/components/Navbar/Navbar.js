"use client";
import  { Suspense, useContext, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import Loader from "../Loader/Loader";
const Navbar = () => {
  const activePath = usePathname();
  const { login, name, handleLogout, uid } = useContext(UserContext);
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
  useEffect(() => {
  }, [login,name,uid,handleLogout]);
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
              {(login === "" || login === undefined || login === null) && (
                <Loader
                  color="#ffffff"
                  speed="0.5s"
                  width="40px"
                  radius="1px"
                />
              )}
              {login === false && login !== undefined && (
                <div className="flex">
                  <Link href={`/login`}>
                    <div
                      className="bg-white text-gray-900 rounded-full py-2 px-4 text-center cursor-pointer"
                      data-text="Sign In"
                    >
                      <span>Sign In</span>
                    </div>
                  </Link>
                </div>
              )}
              {login === true && name != "" && (
                <div className="relative group cursor-pointer">
                  <div
                    className={`w-[40px] select-none h-[40px] bg-white cursor-pointer border-[1px] rounded-full flex border items-center justify-center `}
                  >
                    <span className="text-[18px] uppercase select-none cursor-pointer bg-center font-medium">
                      {name[0]}
                    </span>
                  </div>

                  <div className="absolute top-15 right-[4px] hidden group-hover:block hover:block ease-in w-[160px]">
                    <div className="py-2"></div>
                    <ul className=" bg-gray-300 bg-secondary px-3 py-4 rounded font-light text-sm">
                      <Link href={`/profile/${uid}`}>
                        <li className="hover:underline text-[#cccccc] hover:text-[#ffffff] hover:bg-gray-200  px-4 py-2 rounded">
                          Your Profile
                        </li>
                      </Link>
                      <Link href="/cart">
                        <li className="hover:bg-gray-200 hover:underline text-[#cccccc] hover:text-[#ffffff] px-4 py-2 rounded">
                          Cart
                        </li>
                      </Link>
                      <hr className="border-primary my-2" />
                      <li className="hover:bg-gray-200 hover:bg-primary text-[#cccccc] hover:text-[#ffffff] px-4 py-2 rounded">
                        <button onClick={handleLogout}>Log out</button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </Suspense>
  );
};

export default Navbar;
