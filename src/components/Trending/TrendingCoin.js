"use client";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
// import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";

const SaveBtn = ({ data }) => {
  // const { saveCoin, allCoins, removeCoin } = useContext(StorageContext);
  const { coinCart, SaveCoinCart, login, removeCoinCart,SaveTrendingCoinCart } =
    useContext(UserContext);
  const handleClick = async (e) => {
    if (login) {
      //console.log("IS", coinCart);
      const checkCoinExist = coinCart.some((item) => item.id === data.id);
      //console.log("DOES", checkCoinExist);
      if (checkCoinExist) {
        const result = await removeCoinCart(data.id);
        //console.log("Result", result);
        if (result.success) {
          toast.success(result.message);
        } else {
          //console.log("Error", result);
          toast.error("Coin Not Removed");
        }
      } else {
        //console.log("DAATA", data)
        const result = await SaveTrendingCoinCart(data);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error("Coin Not Added");
        }
      }
    } else {
      toast.error("Login Require to Add to Cart");
    }
  };
  return (
    <button
      className="outline-0 border-0 bg-none px-2 cursor-pointer"
      onClick={(e) => handleClick(e)}
      title="Add to Cart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="gray"
        strokeWidth="1.5"
        className={`w-[1.5rem] ml-1.5 ${
          coinCart.some((item) => item.id === data.id)
            ? "fill-cyan"
            : "fill-gray-100"
        } hover:fill-cyan`}
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    </button>
  );
};
const TrendingCoin = ({ data }) => {
  const { currency, login } = useContext(UserContext);
  const [itemCount, setItemCount] = useState(0);
  // let navigate = useNavigate();
  let router = useRouter();
  const getCoinsDetails = (id) => {
    router.push(`/trending/${id}`);
  };
  // console.log("DATA", data);
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
                <span className="text-gray-100 capitalize">Price :&nbsp; </span>
                <span className="text-cyan">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency ,
                  }).format(data.data.price)}
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
            <div className="items-center justify-center">
              <span className="text-gray-100 capitalize">Add to Cart : </span>
              <SaveBtn data={data} />
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
        <Toaster reverseOrder={false} />
      </div>
    </>
  );
};

export default TrendingCoin;
