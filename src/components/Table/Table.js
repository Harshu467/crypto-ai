"use client";
import Pagination from "../Pagination/Pagination";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

const Table = () => {
  // let { currency ,setError,setTotalPages,sortBy,perPage,page,error} = useContext(UserContext);
  const [currency, setCurrency] = useState("usd");
  const [perPage, setPerPage] = useState(10);
  const [cryptoData, setCryptoData] = useState(null);
  const [totalPages, setTotalPages] = useState(250);
  const [page, setPage] = useState(1);
  // const [coinSearch, setCoinSearch] = useState(null);
  const [sortBy, setSortBy] = useState("market_cap_desc");
  // const [coinData, setCoinData] = useState(null);
  // const [searchText, setSearchText] = useState("");
  // const [searchData, setSearchData] = useState(null);
  const [error, setError] = useState({ data: "", coinData: "", search: "" });
  // const [uid, setUid] = useState('');
  const getCryptoData = async () => {
    console.log("Fetching data");
    setError({ ...error, data: "" });
    console.log("Error", error);
    setTotalPages(13220);
    try {
      const API_KEY =
        process.env.GECKO_API_KEY || "CG-yrQuW6GRJKsLw1FTBdZ8RrpF";
      console.log("API_KEY", API_KEY);
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          x_cg_demo_api_key: API_KEY,
        },
      };
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&x_cg_demo_api_key=${API_KEY}`,
        options
      )
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          }
          let errorResponse = await res.json();
          setError({ ...error, data: errorResponse.error });
          console.log("Err", errorResponse, error);
          throw new Error(errorResponse.error);
        })
        .then((json) => console.log("JSON", json) || json);
      setCryptoData(data);
      console.log("Data", data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  useEffect(() => {
    getCryptoData();
  }, []);
  console.log("CryptoData", cryptoData);
  return (
    <div className="items-center w-full mx-auto">
      <div className="flex items-center flex-col mt-9 border border-gray-100 rounded ">
        {cryptoData ? (
          <table className="w-full table-auto">
            <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100 ">
              <tr>
                <th className="py-1">Assets</th>
                <th className="py-1 sm:table-cell hidden">Name</th>
                <th className="py-1">Price</th>
                <th className="py-1 md:table-cell hidden">Total Volume</th>
                <th className="py-1 sm:table-cell hidden">Market Cap Change</th>
                <th className="py-1 lg:table-cell hidden">1H</th>
                <th className="py-1 lg:table-cell hidden">24H</th>
                <th className="py-1 lg:table-cell hidden">7D</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData?.map((data) => {
                return (
                  <tr
                    key={data.id}
                    className="text-center text-white text-base border-b border-gray-100  hover:bg-gray-200 last:border-b-0"
                  >
                    <td className="py-4 uppercase flex items-center">
                      <Link href={`/${data.id}`} className="cursor-pointer">
                        <img
                          className="w-[3.2rem] h-[3.2rem] mx-1.5"
                          src={data.image}
                          alt={data.name}
                        />
                      </Link>
                      <span>
                        <Link href={`/${data.id}`} className="cursor-pointer">
                          {data.symbol}
                        </Link>
                      </span>
                    </td>
                    <td className="py-4 cursor-pointer sm:table-cell hidden">
                      <Link href={`/${data.id}`} className="cursor-pointer">
                        {data.name}
                      </Link>
                    </td>
                    <td className="py-4">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                      }).format(data.current_price)}
                    </td>
                    <td className="py-4 sm:table-cell hidden">
                      {data.total_volume}
                    </td>
                    <td
                      className={
                        data.market_cap_change_percentage_24h > 0
                          ? "py-4 text-green md:table-cell hidden"
                          : "py-4 text-red md:table-cell hidden"
                      }
                    >
                      {Number(data.market_cap_change_percentage_24h).toFixed(2)}
                      %
                    </td>
                    <td
                      className={
                        data.price_change_percentage_1h_in_currency > 0
                          ? "py-4 text-green lg:table-cell hidden"
                          : "py-4 text-red lg:table-cell hidden"
                      }
                    >
                      {Number(
                        data.price_change_percentage_1h_in_currency
                      ).toFixed(2)}
                      %
                    </td>
                    <td
                      className={
                        data.price_change_percentage_24h_in_currency > 0
                          ? "py-4 text-green lg:table-cell hidden"
                          : "py-4 text-red lg:table-cell hidden"
                      }
                    >
                      {Number(
                        data.price_change_percentage_24h_in_currency
                      ).toFixed(2)}
                      %
                    </td>
                    <td
                      className={
                        data.price_change_percentage_7d_in_currency > 0
                          ? "py-4 text-green lg:table-cell hidden"
                          : "py-4 text-red lg:table-cell hidden"
                      }
                    >
                      {Number(
                        data.price_change_percentage_7d_in_currency
                      ).toFixed(2)}
                      %
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="w-full min-h-[60vh] flex justify-center items-center">
            <div
              className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"
              role="status"
            />
            <span className="ml-2 text-white">Please Wait...</span>
          </div>
        )}
      </div>
      <div className="flex md:flex-row flex-col items-center justify-between  mt-4 capitalize h-[2rem] ">
        <span className="text-white">
          Project Created by{" "}
          <a
            className="text-cyan"
            href="https://github.com/Harshu467"
            rel="noreferrer"
            target={"_blank"}
          >
            Harsh Upadhye
          </a>
        </span>
        {cryptoData && <Pagination />}
      </div>
    </div>
  );
};

export default Table;
