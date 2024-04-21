"use client";

import { ScrollToBottom } from "@/helpers/icons";
import { Button } from "@nextui-org/react";
import React from "react";

export default ScrollBottom = () => {
  return (
    <Button
      className={`absolute right-1 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2 `}
    >
      <ScrollToBottom/>
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
};
