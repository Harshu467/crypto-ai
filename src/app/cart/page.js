"use client";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Outlet } from "react-router-dom";
import DetailsCart from "@/components/Cart/Cart";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

function Cart() {
  const router = useRouter();
  const { uid } = useContext(UserContext);
  if (uid === undefined || uid === null) {
    router.push("/login");
  }
  return (
    <>
      <Navbar />
      <section className="m-auto h-full flex flex-end lg:mt-16 mb-24 relative flex-col ">
        <DetailsCart />
        <Outlet />
      </section>
      <Footer />
    </>
  );
}

export default Cart;
