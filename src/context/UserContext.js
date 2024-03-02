"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { getUserData } from "@/utils/commonFunctions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const router = useRouter();
  const [currency, setCurrency] = useState("usd");
  const [perPage, setPerPage] = useState(10);
  const [cryptoData, setCryptoData] = useState(null);
  const [totalPages, setTotalPages] = useState(250);
  const [page, setPage] = useState(1);
  const [coinSearch, setCoinSearch] = useState(null);
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [coinData, setCoinData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [error, setError] = useState({ data: "", coinData: "", search: "" });
  const [uid, setUid] = useState('');
  const [token, setToken] = useState('');
  const [login, setLogin] = useState();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const getCryptoData = async () => {
    console.log("Fetching data");
    setError({ ...error, data: "" });
    console.log("Error", error);
    setCryptoData();
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
        .then((json) => console.log("JSON",json) || json);
      setCryptoData(data);
      console.log("Data", data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const userAuth = async (user) => {
    if(user){
      console.log("User", user);
      try {
        setToken(user.accessToken);
        setUid(user.uid);
        const userData = await getUserData(user.uid);
        if(!userData.success){
          setLogin(false);
          console.log("Error", userData.error);
        }
        let cookie = Cookies.get('userData');
        if(cookie === undefined || userData){
          const {name, email,uid} = userData.data;
          Cookies.set('userData', JSON.stringify({name, email, uid}));
          setLogin(true);
          setEmail(email);
          setName(name);
          setUid(uid);
        } else {
          const userData = JSON.parse(cookie);
          setEmail(userData.email);
          setName(userData.name);
          setUid(userData.uid);
          setLogin(true);
        }
      } catch (error) {
        console.log("Error", error);
        setLogin(false);
      }
    } else {
      setLogin(false);
    }
  }
  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      setToken('');
      setUid('');
      setEmail('');
      setName('');
      setLogin(false);
      Cookies.remove('userData');
      router.push('/login');
    })
  }
  // useEffect(() => {
  //   getCryptoData();
  // },[coinSearch, currency, sortBy, page, perPage]);

  useEffect(()=>{
    onAuthStateChanged(auth, async(user) => {
      userAuth(user);
    });
  },[])
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
        searchText,
        setSearchText,
        searchData,
        setSearchData,
        uid,
        name,
        email,
        login,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
