import {
  AssuredWorkload,
  AutoGraph,
  CurrencyBitcoin,
  People,
} from "@mui/icons-material";
import React from "react";

const features = [
  {
    name: "Explore Diverse Coins",
    description:
      "Discover a wide range of cryptocurrencies to diversify your investment portfolio.",
    icon: CurrencyBitcoin,
  },
  {
    name: "Real-Time Data",
    description:
      "Access up-to-date market data and insights to make informed trading decisions.",
    icon: AutoGraph,
  },
  {
    name: "Secure Transactions",
    description:
      "Enjoy the security of blockchain technology for seamless and trustworthy transactions.",
    icon: AssuredWorkload,
  },
  {
    name: "Community Engagement",
    description:
      "Connect with a vibrant community of traders and enthusiasts to stay updated and engaged.",
    icon: People,
  },
];
const Why_Use = () => {
  return (
    <div className="bg-inherit py-24 sm:py-32 select-none">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p
            className="mt-2 sm:mt-0 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Why should you use Cryptocurrency?
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-15 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature, i) => (
              <div
                key={feature.name}
                className="p-5 hover:outline hover:cursor-pointer outline-1 outline-gray-600 rounded"
              >
                <div className="relative pl-16">
                  <div className="text-base font-semibold leading-7 text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div>{feature.name}</div>
                  </div>
                  <div className="mt-2 text-base leading-7 text-gray-400">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Why_Use;
