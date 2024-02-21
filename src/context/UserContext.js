"use client";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [currency, setCurrency] = useState("usd");
  const [perPage, setPerPage] = useState(10);
  const [cryptoData, setCryptoData] = useState();
  const [totalPages, setTotalPages] = useState(250);
  const [page, setPage] = useState(1);
  const [coinSearch, setCoinSearch] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [coinData, setCoinData] = useState();
  const [error, setError] = useState({ data: "", coinData: "", search: "" });
 
 
  return (
    <UserContext.Provider
      value={{
        currency,
        setCurrency,
        perPage,
        setPerPage,
        page,
        setPage,
        coinSearch,
        setCoinSearch,
        sortBy,
        setSortBy,
        cryptoData,
        setCryptoData,
        totalPages,
        setTotalPages,
        error,
        setError,
        coinData,
        setCoinData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
