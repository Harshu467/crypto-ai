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
  const storedCoinCart = localStorage.getItem("coinCart");
  const initialCoinCart = storedCoinCart && storedCoinCart !== "undefined" ? JSON.parse(storedCoinCart) : [];
  const [coinCart, setCoinCart] = useState(initialCoinCart);
  
  const SaveCoinCart = (cart) => {
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
  const addCoinCart = (coin) => {
    try {
      console.log("Coin", coin);
      const coinCartItem = localStorage.getItem("coinCart")
        ? JSON.parse(localStorage.getItem("coinCart"))
        : [{}];
      console.log("Coin Cart Item", coinCartItem);
      const exist = coinCartItem.find((x) => x.id === coin.id);
      console.log("Exist", exist);
      if (exist) {
        coinCartItem.map((x) =>
          x.id === coin.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      } else {
        coinCartItem.push({ ...coin, quantity: 1 });
      }
      localStorage.setItem("coinCart", JSON.stringify(coinCartItem));
      setCoinCart(coinCartItem);
      return { success: true, message: "Coin Added to Cart" };
    } catch (error) {
      console.log("Error", error);
      return { success: false, message: error };
    }
  };
  const decreaseCoinCart = (coin) => {
    try {
      console.log("CoinDF", coin);
      const coinCartItem = localStorage.getItem("coinCart")
        ? JSON.parse(localStorage.getItem("coinCart"))
        : [{}];
      console.log("CoinDF", coinCartItem);
      const exist = coinCartItem.find((x) => x.id === coin);
      console.log("Exist", exist);
      if (exist) {
        coinCartItem.map((x) =>
          x.id === coin ? { ...x, quantity: x.quantity - 1 } : x
        );
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
      console.log("User", user);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
