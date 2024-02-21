import Image from "next/image";
import Link from "next/link";
import React from "react";

const images = [
  {
    url: "https://res.cloudinary.com/dfpkudd3b/image/upload/v1707819505/1_y4jvkv.png",
    alt: "Monitor",
  },
  {
    url:"https://res.cloudinary.com/dfpkudd3b/image/upload/v1707819504/5_nkcleu.png",
    alt: "group of people",
  },
  {
    url: "https://res.cloudinary.com/dfpkudd3b/image/upload/v1707819504/2_aay1fl.png",
    alt: "tablet",
  },
  {
    url:"https://res.cloudinary.com/dfpkudd3b/image/upload/v1707819503/6_zhq6fw.webp",
    alt: "graph",
  },
  {
    url:"https://res.cloudinary.com/dfpkudd3b/image/upload/v1707819504/4_qkxisv.png",
    alt: "mobile",
  },
  {
    url:"https://res.cloudinary.com/dfpkudd3b/image/upload/v1707819977/8_esyqkq.png",
    alt: "table",
  },
  {
    url: "https://res.cloudinary.com/dfpkudd3b/image/upload/v1707819504/3_jy6jg3.png",
    alt: "laptop",
  },
];
const Hero = () => {
  return (
    <div className="relative sm:pb-0 select-none overflow-hidden">
      <div className="pt-16 sm:pt-10 sm:pb-0 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <section className="sm:max-w-[19.5rem] md:max-w-[24.5rem] tab:max-w-[28rem] lg:max-w-[30rem]">
            <div
              className="text-4xl font-bold sm:text-[5vw] md:text-[2px] lg:leading-[5.5rem] lg:text-[5rem] text-white"
           >
              Learn.Invest. Grow.
            </div>

            <p
              className="mt-4 text-[20px] text-gray-400 tracking-wide "
            >
              Stay updated and informed with CryptoMarketHub – your go-to
              platform for all things crypto.
            </p>

            <div
              className="mt-14 my-1"
            >
              <Link
                href="/market"
                className="p-3 rounded-md border border-gray-600 hover:bg-gray-200 ease-in duration-200 text-white hover:text-gray-900 "
                type="button"
                aria-label="link to projects section"
              >
                Browse Market
              </Link>
            </div>
          </section>
          <div className="hidden md:block py-8 xsm:px-0 md:px-4 absolute transform left-2 xs:left-1/4 xsm:-translate-x-1/5 xs:-translate-x-1/4 sm:left-1/2 sm:top-0 sm:translate-x-0 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8 ">
            <div className="flex justify-center flex-grow items-center space-x-6 lg:space-x-8">
              <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                {images.slice(0, 2).map((image, index) => (
                  <div
                    key={index}
                    className="floating-image h-52 w-36 md:h-64 md:w-44 overflow-hidden rounded-lg"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center"
                      width={500}
                      height={500}
                    />
                  </div>
                ))}
              </div>
              <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-5">
                {images.slice(2, 5).map((image, index) => (
                  <div
                    key={index}
                    className="floating-image h-52 w-36 md:h-64 md:w-44 overflow-hidden rounded-lg "
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center "
                      width={500}
                      height={500}
                    />
                  </div>
                ))}
              </div>
              <div className="hidden xl:grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                {images.slice(5).map((image, i) => (
                  <div
                    key={i}
                    className="floating-image h-52 w-36 md:h-64 md:w-44 overflow-hidden rounded-lg"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center"
                      width={500}
                      height={500}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
