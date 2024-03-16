"use client";
import Navbar from "@/components/Navbar/Navbar";
import { AnswerIcon, EnterIcon, ProfileIcon } from "@/helpers/icons";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function Chat() {
  const params = useParams();
  const coinId = params.coinchatId;
  const [messages, setMessages] = useState([
    {
      question: "Hello, What is bitcoin Price?",
      sender: "user",
    },
    {
      answer: "The current price of Bitcoin is $40,000",
      sender: "bot",
    },
    {
      question: "What is the market cap of Bitcoin? Explain in 200-300 words",
      sender: "user",
    },
    {
      answer:
        " The market cap of Bitcoin is $40,000. The market cap of a cryptocurrency is calculated by multiplying the number of coins or tokens in existence by its current price. It is a common metric for judging the value of a cryptocurrency. If a cryptocurrency has a high market cap, it is likely to be less volatile than a cryptocurrency with a low market cap. Market cap is also used to compare the value of different cryptocurrencies. For example, the market cap of Bitcoin is higher than the market cap of Ethereum. This means that Bitcoin is more valuable than Ethereum. The market cap of a cryptocurrency can change over time. It can increase or decrease depending on the price of the cryptocurrency and the number of coins or tokens in existence. The market cap of a cryptocurrency is an important metric for investors and traders. It can help them make informed decisions about which cryptocurrencies to buy or sell.",
    },
  ]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const messageInput = e.target.elements.message;
    const message = messageInput.value.trim();
    if (message) {
      setMessages([...messages, { text: message, sender: "user" }]);
      messageInput.value = "";
    }
  };
  return (
    <>
      <Navbar />
      <div className="group w-full md:max-h-[calc(100vh-290px)] max-h-[calc(100vh-220px)] overflow-auto pl-0 duration-300 ease-in-out animate-in pt-[20px]">
        {messages.length > 0 ? (
          <div>
            {messages.map((message, index) => (
              <div
                key={index}
                className="relative overflow-auto mx-auto max-w-2xl px-4 text-[#cccccc]"
              >
                {message.sender === "user" && (
                  <div className="group relative flex items-start">
                    <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
                      <ProfileIcon />
                    </div>
                    <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                      {message.question}
                    </div>
                  </div>
                )}
                <div>
                  {message.answer && (
                    <div>
                      <div
                        data-orientation="horizontal"
                        role="none"
                        className="border border-gray-200 my-4 h-[1px] w-full"
                      />
                      <div className="group relative flex items-start">
                        <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
                          <AnswerIcon />
                        </div>
                        <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                          <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
                            {message.answer.split(/\.{3}/).map((paragraph, index) => (
                              <p key={index} className="mb-2 last:mb-0">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                      {index !== messages.length - 1 && (
                        <div
                          data-orientation="horizontal"
                          role="none"
                          className="border border-gray-200 my-4 h-[1px] w-full"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl px-4">
            <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
              <h1 className="text-white text-lg font-semibold">
                Welcome to Crypto Chatbot!
              </h1>
              <p className="leading-normal text-zinc-600 text-muted-foreground">
                Explore the world of cryptocurrencies with our AI-powered
                chatbot. Get real-time updates on prices, market trends, and
                investment insights.
              </p>
              <p className="text-zinc-600 leading-normal text-muted-foreground">
                Ask us about crypto prices, market trends, or investment
                strategies. Start your crypto journey today with our
                knowledgeable chatbot!
              </p>
            </div>
          </div>
        )}
        <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
          <div className="mx-auto sm:max-w-2xl sm:px-4">
            <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
              <div className="cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 hidden md:block">
                <div className="text-sm font-semibold text-white">
                  {`Is ${
                    coinId.charAt(0).toUpperCase() + coinId.slice(1)
                  }  a worthy`}
                </div>
                <div className="text-sm text-zinc-600">Investment Option?</div>
              </div>
              <div className="cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 hidden md:block">
                <div className="text-sm font-semibold text-white">
                  Understanding{" "}
                  {`${coinId.charAt(0).toUpperCase() + coinId.slice(1)}`}&apos;s
                </div>
                <div className="text-sm text-zinc-600">
                  Investment Potential
                </div>
              </div>
            </div>
            <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
              <form onSubmit={handleMessageSubmit}>
                <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
                  <textarea
                    tabIndex="0"
                    placeholder="Send a message."
                    className="min-h-[60px] text-white w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                    spellCheck="false"
                    autoComplete="off"
                    autoCorrect="off"
                    name="message"
                    rows="1"
                    style={{ height: "66px !important" }}
                  ></textarea>
                  <div className="absolute right-0 top-[13px] sm:right-4">
                    <button
                      className="inline-flex bg-gray-400 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9"
                      type="submit"
                      disabled=""
                      data-state="closed"
                    >
                      <EnterIcon />
                      <span className="sr-only">Send message</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
