"use client";
import { UserContext } from "@/context/UserContext";
import { Add } from "@/helpers/icons";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
// import { useNavigate } from 'react-router-dom'
import { Badge, Button, ButtonGroup } from "@mui/material";
import { Remove, ShoppingCart } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
const TrendingCoin = ({ data }) => {
  const { currency, login } = useContext(UserContext);
  const [itemCount, setItemCount] = useState(0);
  // let navigate = useNavigate();
  let router = useRouter();
  const getCoinsDetails = (id) => {
    router.push(`/trending/${id}`);
  };
  const handleCart = () => {
    if (login) {
    } else {
      toast.error("Please Login First");
    }
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
            <div className="mx-2 items-center justify-center">
              <Badge className="" color="secondary" badgeContent={itemCount}>
                <ShoppingCart color="white" />{" "}
              </Badge>
              <ButtonGroup className="px-2 mt-2">
                <Button
                  onClick={() => {
                    handleCart();
                  }}
                >
                  {" "}
                  <Remove fontSize="small" />
                </Button>
                <Button
                  onClick={() => {
                    handleCart();
                  }}
                >
                  {" "}
                  <Add fontSize="small" />
                </Button>
              </ButtonGroup>
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
