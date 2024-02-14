"use client";
import Filter from "@/components/Filter/Filter";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Table from "@/components/Table/Table";
import React from "react";
import { Outlet } from "react-router-dom";

const page = () => {
  return (
    <>
      <Navbar />
      <section className="xs:w-[80%] items-center m-auto w-[90%] h-full flex flex-end lg:mt-16 mb-24 relative flex-col ">
        <Filter />
        <Table />
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default page;
