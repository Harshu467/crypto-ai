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
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");
  const [login, setLogin] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  let initialCoinCart = [];
  if (typeof localStorage !== "undefined") {
    const storedCoinCart = localStorage.getItem("coinCart");
    if (storedCoinCart && storedCoinCart !== "undefined") {
      initialCoinCart = JSON.parse(storedCoinCart);
    }
  }

  const [coinCart, setCoinCart] = useState(initialCoinCart);

  const SaveCoinCart = async (cart) => {
    try {
      const coinCartItem = localStorage.getItem("coinCart")
        ? JSON.parse(localStorage.getItem("coinCart"))
        : [];
      coinCartItem.push({
        id: cart.id,
        name: cart.name,
        symbol: cart.symbol,
        image: cart.image,
        quantity: 1,
      });
      console.log("Cart Item", coinCartItem);
      localStorage.setItem("coinCart", JSON.stringify(coinCartItem));
      setCoinCart(coinCartItem);
      return { success: true, message: "Coin Added to Cart" };
    } catch (error) {
      console.log("Error", error);
      return { success: false, message: error };
    }
  };
  const addCoinCart = async (coin) => {
    try {
      console.log("CoinDF", coin);
      const coinCartItem = localStorage.getItem("coinCart")
        ? JSON.parse(localStorage.getItem("coinCart"))
        : [];
      console.log("CoinDF", coinCartItem);
      const exist = coinCartItem.findIndex((x) => x.id === coin);
      console.log("Exist", exist);
      if (exist !== -1) {
        console.log("YES");
        coinCartItem[exist].quantity += 1;
        localStorage.setItem("coinCart", JSON.stringify(coinCartItem));
        setCoinCart(coinCartItem);
        return { success: true, message: "Coin Added to Cart" };
      } else {
        console.log("NO");
        const API_KEY =
          process.env.GECKO_API_KEY || "CG-yrQuW6GRJKsLw1FTBdZ8RrpF";
        const options = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            x_cg_demo_api_key: API_KEY,
          },
        };
        const result = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin}?x_cg_demo_api_key=${API_KEY}`,
          options
        ).then(async (res) => {
          if (res.ok) {
            console.log("Res", res);
            const result = await res.json();
            console.log("Result", result);
            const coin = {
              id: result.id,
              name: result.name,
              symbol: result.symbol,
              image: result.image.large,
              quantity: 1,
            };
            console.log("Coin", coin);
            const Add = await SaveCoinCart(coin);
            if (Add.success && Add) {
              console.log("Add", Add);
              return { success: true, message: "Coin Added to Cart" };
            } else {
              return { success: false, message: Add.message };
            }
          }
          let errorResponse = await res.json();
          setError({ ...error, data: errorResponse.error });
          throw new Error(errorResponse.error);
        });
      }
    } catch (error) {
      console.log("Error in Add Coin Cart", error);
      return { success: false, message: error };
    }
  };

  const decreaseCoinCart = (coin) => {
    try {
      console.log("CoinDF", coin);
      const coinCartItem = localStorage.getItem("coinCart")
        ? JSON.parse(localStorage.getItem("coinCart"))
        : [];
      console.log("CoinDF", coinCartItem);
      const exist = coinCartItem.findIndex((x) => x.id === coin);
      console.log("Exist", exist);
      if (exist !== -1) {
        console.log("YES");
        if (coinCartItem[exist].quantity > 1) {
          coinCartItem[exist].quantity -= 1;
        } else {
          coinCartItem.splice(exist, 1);
        }
        localStorage.setItem("coinCart", JSON.stringify(coinCartItem));
        setCoinCart(coinCartItem);
        return { success: true, message: "Coin Removed from Cart" };
      } else {
        return { success: false, message: "Coin Not Exist in Cart" };
      }
    } catch (error) {}
  };
  const removeCoinCart = (coin) => {
    try {
      console.log("CoinDF", coin);
      const coinCartItem = localStorage.getItem("coinCart")
        ? JSON.parse(localStorage.getItem("coinCart"))
        : [];
      console.log("CoinDF", coinCartItem);
      if (coinCart.length === 0) {
        return { success: false, message: "Cart is empty" };
      }
      // check if coin exist in cart if yes then remove it else return with message not exist
      const exist = coinCartItem.find((x) => x.id === coin);
      console.log("Exist", exist);
      if (exist) {
        const newCart = coinCartItem.filter((x) => x.id !== coin);
        console.log("New Cart", newCart);
        localStorage.setItem("coinCart", JSON.stringify(newCart));
        setCoinCart(newCart);
        return { success: true, message: "Coin Removed from Cart" };
      } else {
        return { success: false, message: "Coin Not Exist in Cart" };
      }
    } catch (error) {
      console.log("Error:", error);
      return { success: false, message: error };
    }
  };

  const getPricebyId = async (coinId) => {
    try {
      const API_KEY = process.env.GECKO_API_KEY;
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          x_cg_demo_api_key: API_KEY,
        },
      };
      const price = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${currency}&x_cg_demo_api_key=${API_KEY}`,
        options
      ).then(async (res) => {
        if (res.ok) {
          return res.json();
        }
        let errorResponse = await res.json();
        setError({ ...error, data: errorResponse.error });
        throw new Error(errorResponse.error);
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const userAuth = async (user) => {
    if (user) {
      try {
        setToken(user.accessToken);
        setUid(user.uid);
        const userData = await getUserData(user.uid);
        if (!userData.success) {
          setLogin(false);
          console.log("Error", userData.error);
        }
        let cookie = Cookies.get("userData");
        if (cookie === undefined || userData) {
          const { name, email, uid } = userData.data;
          Cookies.set("userData", JSON.stringify({ name, email, uid }));
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
  };
  const handleLogout = () => {
    signOut(auth).then(() => {
      setToken("");
      setUid("");
      setEmail("");
      setName("");
      setLogin(false);
      Cookies.remove("userData");
      localStorage.removeItem("coinCart");
      setCoinCart([]);
      router.push("/login");
    });
  };
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      userAuth(user);
    });
  }, []);
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
        addCoinCart,
        removeCoinCart,
        SaveCoinCart,
        coinCart,
        setCoinCart,
        getPricebyId,
        decreaseCoinCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
