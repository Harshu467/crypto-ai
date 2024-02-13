"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { Github } from "@/helpers/icons";
import { LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import { Facebook, Instagram } from "mdi-material-ui";
const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear();

  const footerdocsLinks = [
    {
      title: "Documentation",
      child: [
        {
          name: "Contributing Guide",
          link: "https://github.com/priyankarpal/ProjectsHut/blob/main/contributing.md",
        },
        {
          name: "Add projects via GitHub",
          link: "https://github.com/priyankarpal/ProjectsHut/blob/main/contributing.md#how-to-add-your-projects-to-projectshut",
        },
        {
          name: "Run the project locally",
          link: "https://github.com/priyankarpal/ProjectsHut/blob/main/contributing.md#note-alternatively-if-you-prefer-to-run-the-project-locally-follow-these-steps",
        },
      ],
    },
  ];

  const footerServiceLinks = [
    {
      title: "License",
      child: [
        {
          name: "MIT License",
          link: "https://github.com/priyankarpal/ProjectsHut/blob/main/LICENSE",
        },
        {
          name: "Code of Conduct",
          link: "https://github.com/priyankarpal/ProjectsHut/blob/main/CODE_OF_CONDUCT.md",
        },
      ],
    },
  ];
  let content1 = [
    { title: "About", goTo: "/about" },
    { title: "Extend", goTo: "/extend" },
    { title: "FAQ", goTo: "/faq" },
    { title: "Contact", goTo: "/contact-us" },
  ];
  // eslint-disable-next-line react/jsx-key
  let content2 = [
    // { icon: <Facebook />, goTo: 'facebook.com' },
    {
      title: "Facebook",
      icon: <Facebook />,
      goTo: "/",
    },
    {
      title: "X",
      icon: <Twitter />,
      goTo: "/",
    },
    {
      title: "Instagram",
      icon: <Instagram />,
      goTo: "/",
    },
    {
      title: "LinkedIn",
      icon: <LinkedIn />,
      goTo: "/",
    },
    {
      title: "Youtube",
      icon: <YouTube />,
      goTo: "/",
    },
  ];

  const currentYear = new Date().getFullYear();

  const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      function handleResize() {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  };
  const { width, height } = useWindowDimensions();

  return (
    <footer>
      <div className="pt-[60px] border-t border-gray-800 text-white px-[20px] md:px-[10px] py-[20px] md:w-[90%] w-[95%] m-auto">
        <div className="flex flex-col md:flex-row gap-[20px] justify-between md:pb-[40px] pb-[20px]">
          <div>
            <Link
              href="/"
              className="inline-flex h-10 items-start text-white rounded-lg font-bold text-[1.5rem]"
            >
              Crypto <span className="text-primary">-Currency</span>
              <span className="sr-only">CryptoCurrency</span>
            </Link>

            <p className="Satoshi400 w-[240px] pt-[16px] text-[16px] text-[white]">
              Stay ahead in the world of cryptocurrencies with our user-friendly
              platform
            </p>
            {width > 768 && (
              <div className="flex md:pt-[52px] flex-col lg:justify-start gap-[16px] sm:justify-start justify-center">
                <span className="Satoshi500 text-[16px] text-[white]">
                  Follow Us:
                </span>
                <ul className="flex pl-[0px] flex-row lg:justify-start gap-[16px] md:gap-[24px] sm:justify-start justify-center">
                  {content2.map((item, index) => {
                    return (
                      <li className="list-none pl-[0px]" key={index}>
                        <Link target="_blank" href={`${item.goTo}`}>
                          {item.icon}
                          <span className="sr-only">{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* links */}
          <nav className="grid gap-[24px] md:justify-evenly sm:cols-1 md:grid-cols-3 lg:grid-cols-3 md:gap-6 w-full max-w-[670px] :ml-16">
            {/* <div className="w-full row-span-3 lg:row-span-1 ">
            <p className="footer_heading">Who&apos;s it For?</p>
            <ul className="list-none flex flex-col justify-center items-start gap-[16px] md:gap-[24px] pl-[0px]">
              <li className="footer_listitem">
                <Link href={'/ai-learning-tool-for-students'}>Student</Link>
              </li>
              <li className="footer_listitem">
                <Link href={'/ai-productivity-tool-for-professionals'}>
                  Professionals
                </Link>
              </li>
            </ul>
          </div> */}
            <div className="w-full row-span-2 lg:row-span-1">
              <p className="footer_heading">Home</p>
              <ul className="list-none text-[grey] pt-[24px]  flex flex-col justify-center items-start gap-[16px] pl-[0px]">
                <li className="footer_listitem">
                  <Link href={"/"}>About</Link>
                </li>
                <li className="footer_listitem">
                  <Link href={"/"}>Contact</Link>
                </li>
              </ul>
            </div>
            <div className="w-full row-span-3 lg:row-span-1 ">
              <p className="footer_heading">Support</p>
              <ul className="list-none text-[grey] pt-[24px]  flex flex-col justify-center items-start gap-[16px] pl-[0px]">
                <li className="footer_listitem">
                  <Link href={"/"}>FAQ</Link>
                </li>
                <li className="footer_listitem">
                  <Link href={"/"}>
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full row-span-3 lg:row-span-1">
              <p className="footer_heading">Other</p>
              <ul className="list-none text-[grey] pt-[24px] flex flex-col justify-center items-start gap-[16px] pl-[0px]">
                <li className="footer_listitem">
                  <Link href="/">Privacy Policy</Link>
                </li>
                <li className="footer_listitem">
                  <Link href="/">Terms and Condition</Link>
                </li>
                <li className="footer_listitem">
                  <Link href={"/"}>Services</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        {width < 769 && (
          <div className="flex items-start pb-[32px] md:pt-[82px] flex-col lg:justify-start gap-[16px] sm:justify-start justify-center">
            <span className="Satoshi500 text-left text-[16px] text-[#8D8A95]">
              Follow Us:
            </span>
            <ul className="flex pl-[0px] flex-row lg:justify-start gap-[16px] md:gap-[24px] sm:justify-start justify-center">
              {content2.map((item, index) => {
                return (
                  <li className="list-none pl-[0px]" key={index}>
                    <Link target="_blank" href={`${item.goTo}`}>
                      {item.icon}
                      <span className="sr-only">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="md:pt-[40px] pt-[20px] border-t border-gray-800">
          {/* socials */}
          <div className="lg:flex sm:flex flex-col items-center text-center md:flex-row md:justify-between text-[#E8ECEF] text-[14px] Satoshi400 sm:justify-between md:items-start">
            <div className="copyright md:m-auto flex flex-col md:flex-row items-center text-[#E8ECEF]">
              <p className="leading-none max-sm:text-center text-[14px] mb-[1em]">
                © {currentYear}{" "}
                <a href={`https://cloudredux.com/`} target="_blank">
                  CryptoCurrency
                </a>{" "}
                &middot; All Rights Reserved.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
