"use client";
import Navbar from "@/components/Navbar/Navbar";
import { AnswerIcon, EnterIcon, ProfileIcon } from "@/helpers/icons";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Chat() {
  const params = useParams();
  const coinId = params.coinchatId;
  const [messages, setMessages] = useState([
    {
      text: "Hello, I'm Crypto Chatbot. How can I help you today?",
      sender: "bot",
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
      <div className="group w-full overflow-auto pl-0 duration-300 ease-in-out animate-in pt-[20px]">
        {messages.length > 0 ? (
          <div className="relative md:max-h-[calc(100vh-320px)] max-h-[calc(100vh-220px)]  overflow-auto mx-auto max-w-2xl px-4 text-[#cccccc]">
            <div className="group relative flex items-start">
              <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
                <ProfileIcon />
              </div>
              <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                Explain the concept of a serverless function
              </div>
            </div>
            <div
              data-orientation="horizontal"
              role="none"
              className="border border-gray-200 my-4 h-[1px] w-full"
            />
            <div>
              <div className="group relative flex items-start">
                <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
                  <AnswerIcon />
                </div>
                <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                  <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
                    <p className="mb-2 last:mb-0">
                      A serverless function is a piece of code that runs in a
                      cloud environment without the need for the developer to
                      manage the underlying infrastructure. In a serverless
                      architecture, the cloud provider dynamically allocates
                      resources to run the function based on the request made by
                      the user. The developer only needs to focus on writing the
                      code and defining the function's behavior without having
                      to worry about server provisioning, scaling, or
                      maintenance.
                    </p>
                    <p className="mb-2 last:mb-0">
                      When a request triggers the serverless function, the cloud
                      provider automatically handles the execution, scaling,
                      monitoring, and logging of the function. The function runs
                      in a stateless manner, meaning it starts from scratch with
                      each invocation and does not maintain persistent
                      connections or resources. This allows for efficient
                      resource utilization and cost optimization since users
                      only pay for the actual compute time used by the function.
                    </p>
                    <p className="mb-2 last:mb-0">
                      Serverless functions are commonly used for event-driven
                      applications, microservices, and backend services that
                      require quick and scalable execution without the overhead
                      of managing infrastructure. Popular serverless platforms
                      include AWS Lambda, Azure Functions, Google Cloud
                      Functions, and IBM Cloud Functions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                  {`${coinId.charAt(0).toUpperCase() + coinId.slice(1)}`}'s
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
