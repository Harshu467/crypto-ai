"use client";
import { useContext, useEffect } from "react";
import "./Cart.css";
import { Add, Cross, Minus } from "@/helpers/icons";
import { UserContext } from "@/context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
const stripe = "/api/payment";
const DetailsCart = () => {
  const {
    coinCart,
    addCoinCart,
    decreaseCoinCart,
    removeCoinCart,
    login,
    currency,
    getPricebyId,
    uid,
    email,
  } = useContext(UserContext);
  let CartItem = coinCart;
  const router = useRouter();
  useEffect(() => {
    if (login === false) {
      toast.error("Please Login to view Cart");
      router.push("/login");
    }
    const fetchPrice = async () => {
      const updatedItems = await CartItem.map(async (item) => {
        if (item.current_price === null) {
          const res = await getPricebyId(item.id);
          // console.log("RES",res)
          if (res.success) {
            item.current_price = res.data.market_data.current_price;
          }
        }
        return item;
      });
      CartItem = updatedItems;
    };
    if (typeof window !== "undefined") {
      fetchPrice();
    }
  }, []);
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.quantity * item.current_price,
    0
  );
  const addToCart = async (item) => {
    if (coinCart.find((i) => i.id === item.id)) {
      const res = await addCoinCart(item.id);
      if (res.success) {
        //console.log("Item added to cart");
      } else {
        //console.log("Item not added to cart");
      }
    } else {
      //console.log("Item not found");
      toast.error("Item not found");
    }
  };
  const decreaseQty = async (item) => {
    if (coinCart.find((i) => i.id === item.id)) {
      const res = await decreaseCoinCart(item.id);
      if (res.success) {
        //console.log("Item removed from cart");
      } else {
        //console.log("Item not removed from cart");
      }
    } else {
      //console.log("Item not found");
      toast.error("Item not found");
    }
  };
  const removeCoin = async (item) => {
    if (coinCart.find((i) => i.id === item.id)) {
      const res = await removeCoinCart(item.id);
      if (res.success) {
        //console.log("Item removed from cart");
      } else {
        //console.log("Item not removed from cart");
      }
    } else {
      //console.log("Item not found");
      toast.error("Item not found");
    }
  };
  const checkOut = async () => {
    //console.log("Checkout");
    const body = {
      amount: totalPrice,
      uid: uid,
      currency: currency,
      line_items: coinCart,
      email: email,
    };
    //console.log("Body", body);
    if (totalPrice > 999999.99) {
      toast.error("Total Amount exceeds allow limit");
      return;
    }
    try {
      const res = await fetch(stripe, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log("Response", res)
      const data = await res.json();
      //console.log("Data", data);
      if (data.status === 600) {
        toast.error("Total Amount entered exceeds the allowed limit");
      }
      if (data.success) {
        //console.log(data.message);
        router.push(data.url);
      } else {
        toast.error(data.message);
        //console.log(data.message);
      }
    } catch (error) {
      //console.log("Error in Checkout", error);
    }
  };
  // console.log("CoinCart", coinCart);
  return (
    <>
      <section className="flex text-white flex-col gap-4 md:flex-row xsm:my-2 p-4 md:p-8">
        {/* <div className="container flex justify-between"> */}
        <div className="w-full md:w-3/4 md:mx-2 flex flex-col flex flex-col shadow-xl rounded-md mb-4 text-white mt-1">
          {coinCart.length === 0 ? (
            <h1 className="text-[#e94560] font-medium text-lg justify-center mt-[30px] h-[200px] bg-black p-5 relative shadow-xl rounded-md border border-gray-800 m-4">
              No Items are add in Cart
            </h1>
          ) : (
            coinCart.map((item) => {
              const productQty = item.current_price * item.quantity;

              return (
                <div
                  className="cart-list shadow-xl rounded-md text-white border border-gray-800 mt-1 bg-black p-5 relative rounded-lg shadow-md m-4 flex justify-between"
                  key={item.id}
                >
                  {/* <div className="w-28 md:w-32 md:h-32 my-auto ml-[30px] h-28"> */}
                  <img
                    src={item.image}
                    className="w-28 md:w-32 md:h-32 my-auto ml-[30px] h-28 object-contain"
                    alt=""
                  />
                  {/* </div> */}
                  <div className="cart-details pl-[30px]">
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "500",
                        marginTop: "20px",
                      }}
                    >
                      {item.name}
                    </h3>
                    <h4
                      style={{
                        fontSize: "18px",
                        fontWeight: "400",
                        marginTop: "60px",
                        color: "grey",
                      }}
                    >
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                      }).format(item.current_price)}{" "}
                      * {item.quantity}
                      <span
                        style={{
                          marginLeft: "30px",
                        }}
                      >
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: currency,
                        }).format(productQty)}
                      </span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="text-[#e94560] text-xl text-right mr-4">
                      <button onClick={() => removeCoin(item)}>
                        <Cross />
                      </button>
                    </div>
                    <div className="cartControl flex justify-between">
                      <button
                        className="flex items-center justify-center border border-solid border-gray-200 hover:border-gray-300 text-[#e94560]"
                        onClick={() => addToCart(item)}
                      >
                        <Add />
                      </button>
                      <span className="flex items-center justify-center px-[4px]">
                        {item.quantity}
                      </span>
                      <button
                        className="flex items-center justify-center border border-solid border-gray-200 hover:border-gray-300 text-[#e94560]"
                        onClick={() => decreaseQty(item)}
                      >
                        <Minus />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })
          )}
        </div>

        <div className="w-full md:w-[50%] h-full lg:max-w-[35%] rounded-md mt-[30px] shadow-xl rounded-md md:sticky md:top-28 text-white border border-gray-800 bg-black p-5 relative rounded-lg shadow-md">
          <h2 className="text-lg mb-5 font-bold border-b border-gray-900 pb-2 text-[#e94560]">
            Cart Summary
          </h2>
          <div className="flex pb-[30px] justify-between">
            <h4 className="text-base font-normal">Total Price :</h4>
            <h3 className="text-base font-medium text-[#e94560]">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: currency,
              }).format(totalPrice)}
            </h3>
          </div>
          <div className="bg-[#e94560] cursor-pointer text-center py-2 px-4 rounded-md">
            <button
              onClick={() => {
                checkOut();
              }}
              className="text-white font-bold"
            >
              Checkout
            </button>
          </div>
        </div>
        {/* </div> */}
      </section>
      <Toaster reverseOrder={false} />
    </>
  );
};

export default DetailsCart;
