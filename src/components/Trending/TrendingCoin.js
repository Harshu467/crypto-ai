"use client";
import { UserContext } from "@/context/UserContext";
import { Add } from "@/helpers/icons";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
// import { useNavigate } from 'react-router-dom'

const TrendingCoin = ({ data }) => {
  const { currency } = useContext(UserContext);
  // let navigate = useNavigate();
  let router = useRouter();
  const getCoinsDetails = (id) => {
    router.push(`/trending/${id}`);
  };
  return (
    <>
      <div
        className="lg:w-[40%] sm:w-[60%] w-[80%] bg-gray-200 mb-12 last:mb-0 rounded-lg p-4 relative cursor-pointer
    hover:bg-gray-100 hover:bg-opacity-40"
      >
        {data ? (
          <>
            <div onClick={() => getCoinsDetails(data.id)}>
              <h3 className="txt-base flex items-center my-0.5">
                <span className="text-gray-100 capitalize">Name :&nbsp; </span>
                <span className="text-cyan">{data.name}</span>
              </h3>
              <h3 className="txt-base flex items-center my-0.5">
                <span className="text-gray-100 capitalize">
                  Market Cap Rank :&nbsp;{" "}
                </span>
                <span className="text-cyan">{data.market_cap_rank}</span>
              </h3>
              <h3 className="txt-base flex items-center my-0.5">
                <span className="text-gray-100 capitalize">
                  Price [In BTC] :&nbsp;{" "}
                </span>
                <span className="text-cyan">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "btc",
                    maximumSignificantDigits: 5,
                  }).format(data.price_btc)}
                </span>
              </h3>
              <h3 className="txt-base flex items-center my-0.5">
                <span className="text-gray-100 capitalize">Score :&nbsp; </span>
                <span className="text-cyan">{data.score}</span>
              </h3>
              <img
                src={data.large}
                alt={data.name}
                className="absolute lg:top-2/4 top-4 lg:-right-12 -right-6 -translate-y-2/4  lg:w-[35%] w-[5rem] h-auto rounded-full"
              />
            </div>
            <div className="text-[#e94560] flex gap-4">
              <h4>
                <span className="text-gray-100 capitalize">Add to Cart : </span>{" "}
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: `${currency}`,
                  maximumSignificantDigits: 5,
                }).format(data.price_btc)}
              </h4>
              <button
                title="Add to Cart"
                className="bg-transparent hover:cursor-pointer hover:border-[white] hover:bg-red-500 hover:text-white text-red-500  transition duration-500 border-[3px] border-opacity-50 border-[#e94560] rounded-md"
              >
                <Add />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full  h-full flex justify-center items-center">
            <div
              className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"
              role="status"
            />
            <span className="ml-2">Please Wait...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default TrendingCoin;
