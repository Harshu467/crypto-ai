"use client";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import ScrollBottom from "@/components/ScrollDown/ScrollBottom";
import Speak from "@/components/Speak/Speak";
import { UserContext } from "@/context/UserContext";
import { AnswerIcon, Copy, EnterIcon, ProfileIcon } from "@/helpers/icons";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
export const runtime = "edge";
const CryptoAI = "/api/crypto-ai";
export default function Chat() {
  const messageRef = useRef(null);
  const params = useParams();
  const router = useRouter();
  const { uid, token, currency } = useContext(UserContext);
  const coinId = params.coinchatId;
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedTone, setSelectedTone] = useState("Select Tone");
  const [selectedLanguage, setSelectedLanguage] = useState("Select Language");

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    // console.log("UID", uid, token);
    if (
      uid === null ||
      token === null ||
      uid === undefined ||
      token === undefined ||
      uid === "" ||
      token === ""
    ) {
      // console.log("No UID or Token");
      toast.error("You need to login to use this feature");
      router.push("/login");
      return;
    }
    if (
      selectedTone === "Select Tone" ||
      selectedLanguage === "Select Language"
    ) {
      setSelectedTone("Neutral");
      setSelectedLanguage("English");
    }
    const messageInput = e.target.elements.message;
    const message = messageInput.value.trim();
    if (!message) return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { question: message, sender: "user" },
    ]);
    messageInput.value = "";
    try {
      setIsTyping(true);
      const body = {
        tone: selectedTone,
        language: selectedLanguage,
        currency: currency,
        message,
        coinId,
        uid,
      };
      //console.log("BODY", body, token);
      const response = await fetch(CryptoAI, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      const m1 = data.message.data.choices[0].message.content;
      // console.log("FROM LURL", data, m1);
      if (data.success) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { answer: m1, sender: "assistant" },
        ]);
      }
    } catch (e) {
      console.log("Error in handleMessageSubmit", e);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptClick = async (prompt) => {
    try {
      // console.log("UID", uid, token);
      if (
        uid === null ||
        token === null ||
        uid === undefined ||
        token === undefined ||
        uid === "" ||
        token === ""
      ) {
        // console.log("No UID or Token");
        toast.error("You need to login to use this feature");
        router.push("/login");
        return;
      }
      if (
        selectedTone === "Select Tone" ||
        selectedLanguage === "Select Language"
      ) {
        setSelectedTone("Neutral");
        setSelectedLanguage("English");
      }
      const message = prompt;
      // console.log("PROMPT", selectedLanguage, selectedTone);
      if (!message) return;
      setMessages((prevMessages) => [
        ...prevMessages,
        { question: message, sender: "user" },
      ]);
      try {
        setIsTyping(true);
        const body = {
          tone: selectedTone,
          language: selectedLanguage,
          currency: currency,
          message,
          coinId,
          uid,
        };
        //console.log("BODY", body, token);
        const response = await fetch(CryptoAI, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        // console.log("RESPONSE", response);
        if (response.ok) {
          const data = await response.json();
          // const m1 = data.message.data.choices[0].message.content;
          // console.log("FROM LURL", data);
          const choices = data?.message?.data?.choices;

          if (!choices || !choices[0]?.message?.content) {
            // Show error message in chat if choices are missing or invalid
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                answer:
                  "🚧 Oops! Our crypto chatbot is currently unavailable. We are working to get it back online as soon as possible. In the meantime, feel free to check back later or contact support if you need help. Thanks for your patience! 🙏",
                sender: "assistant",
              },
            ]);
            return;
          }
          const m1 = choices[0].message.content;
          if (data.success) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { answer: m1, sender: "assistant" },
            ]);
          }
        } else {
          console.log("Error in Response", body, response);
        }
      } catch (e) {
        console.log("Error in handleMessageSubmit", e);
      } finally {
        setIsTyping(false);
      }
    } catch (error) {
      console.log("Error in handlePromptClick", error);
    }
  };
  // console.log("Message", messages);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynth, setSpeechSynth] = useState(null);

  const startSpeaking = (text) => {
    setIsSpeaking(true);
    const synth = window.speechSynthesis;
    const speechText = new SpeechSynthesisUtterance(text);
    speechText.lang = "en-US";
    speechText.rate = 1;
    synth.speak(speechText);
    setSpeechSynth(synth);
  };

  const stopSpeaking = () => {
    if (speechSynth !== null) {
      speechSynth.cancel();
      setIsSpeaking(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text.replace(/(<([^>]+)>)/gi, ""));
  };
  useEffect(() => {
    // console.log("Selected Tone", selectedTone);
    // console.log("Selected Language", selectedLanguage);
  }, [selectedTone, selectedLanguage]);
  return (
    <>
      <Navbar />
      <div className="group w-full md:max-h-[calc(100vh-350px)] max-h-[calc(100vh-250px)] overflow-auto pl-0 duration-300 ease-in-out animate-in pt-[20px]">
        {messages.length > 0 ? (
          <div>
            {messages.map((message, index) => (
              <div
                key={index}
                className="relative overflow-auto mx-auto max-w-2xl px-4"
              >
                {message.sender === "user" && (
                  <div className="group relative flex items-start text-[#cccccc]">
                    <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
                      <ProfileIcon />
                    </div>
                    <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                      {message.question}
                    </div>
                  </div>
                )}
                {message.sender === "assistant" && (
                  <div>
                    <div
                      data-orientation="horizontal"
                      role="none"
                      className="border border-gray-200 my-6 h-[1px] w-full"
                    />
                    <div className="group relative flex items-start">
                      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
                        <AnswerIcon />
                      </div>
                      <div className="ml-4 flex-1 space-y-2 overflow-hidden text-[#cccccc] px-1">
                        <div
                          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                          dangerouslySetInnerHTML={{ __html: message.answer }}
                        />
                        <div className="flex justify-between px-[16px] py-[7px]  gap-2 mt-2">
                          <Speak language={selectedLanguage} message={message.answer} />
                          <button
                            onClick={() => copyToClipboard(message.answer)}
                            className="text-sm font-semibold text-white bg-primary rounded-md px-2 py-1 hover:bg-primary-dark"
                          >
                            <Copy />
                          </button>
                        </div>
                      </div>
                    </div>
                    {index !== messages.length - 1 && (
                      <div
                        data-orientation="horizontal"
                        role="none"
                        className="border border-gray-200 my-6 h-[1px] w-full"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="relative overflow-auto mx-auto max-w-2xl px-4 text-[#cccccc]">
                <div
                  data-orientation="horizontal"
                  role="none"
                  className="border border-gray-200 my-6 h-[1px] w-full"
                />
                <div className="group relative flex items-start">
                  <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
                    <AnswerIcon />
                  </div>
                  <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                    <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
                      Generating Response...
                    </div>
                  </div>
                </div>
              </div>
            )}
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
        <div ref={messageRef} />
        <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
          <div className="mx-auto sm:max-w-2xl sm:px-4">
            <div className="mb-4 pt-[6px] grid grid-cols-2 gap-2 px-4 sm:px-0">
              <div
                onClick={() => {
                  if (!isTyping) {
                    handlePromptClick(
                      `Is ${
                        coinId.charAt(0).toUpperCase() + coinId.slice(1)
                      }  a worthy Investment Option?`
                    );
                  }
                }}
                className="cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 hidden md:block"
              >
                <div className="text-sm font-semibold text-white">
                  {`Is ${
                    coinId.charAt(0).toUpperCase() + coinId.slice(1)
                  }  a worthy`}
                </div>
                <div className="text-sm text-zinc-600">Investment Option?</div>
              </div>
              <div
                onClick={() => {
                  if (!isTyping) {
                    handlePromptClick(`Understanding
                    ${
                      coinId.charAt(0).toUpperCase() + coinId.slice(1)
                    } Investment Potential`);
                  }
                }}
                className="cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 hidden md:block"
              >
                <div className="text-sm font-semibold text-white">
                  Understanding{" "}
                  {`${coinId.charAt(0).toUpperCase() + coinId.slice(1)}`}&apos;s
                </div>
                <div className="text-sm text-zinc-600">
                  Investment Potential
                </div>
              </div>
            </div>
            {/* <Button
                onClick={() => {
                  window.scrollTo(0, document.body.scrollHeight);
                }}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2 ${
                  isAtBottom ? "opacity-0" : "opacity-100"
                }`}
              >
                <ScrollBottom />
              </Button> */}
            <div className="space-y-4 border-t pt-[1.5rem] bg-background px-4 pb-2 shadow-lg sm:rounded-t-xl sm:border md:pb-4">
              <div className="flex justify-between pb-[2px]">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      style={{
                        textAlign: "center",
                      }}
                      variant="bordered"
                      className="capitalize bg-[#000000] text-[white] border rounded-[3px] pl-[18px] pr-[18px] pt-[8px] pb-[8px]"
                    >
                      {selectedTone}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    className="bg-[#000000] border text-[white]"
                    aria-label="Tone Selection"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedTone}
                    onSelectionChange={(keys) =>
                      setSelectedTone(keys.values().next().value)
                    }
                  >
                    <DropdownItem key="Friendly">Friendly</DropdownItem>
                    <DropdownItem key="Humorous">Humorous</DropdownItem>
                    <DropdownItem key="Neutral">Neutral</DropdownItem>
                    <DropdownItem key="Poetic">Poetic</DropdownItem>
                    <DropdownItem key="Professional">Professional</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      className="border text-[white] bg-[#000000] capitalize pl-[18px] pr-[18px] pt-[8px] pb-[8px] rounded-[3px]"
                      style={{
                        textAlign: "center",
                      }}
                      variant="bordered"
                    >
                      {selectedLanguage}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    className="bg-[#000000] border text-[white] w-[140px] p-[4px] "
                    aria-label="Language Selection"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedLanguage}
                    onSelectionChange={(keys) =>
                      setSelectedLanguage(keys.values().next().value)
                    }
                  >
                    <DropdownItem key="Chinese">Chinese</DropdownItem>
                    <DropdownItem key="English">English</DropdownItem>
                    <DropdownItem key="French">French</DropdownItem>
                    <DropdownItem key="German">German</DropdownItem>
                    <DropdownItem key="Gujarati">Gujarati</DropdownItem>
                    <DropdownItem key="Hindi">Hindi</DropdownItem>
                    <DropdownItem key="Italian">Italian</DropdownItem>
                    <DropdownItem key="Japanese">Japanese</DropdownItem>
                    <DropdownItem key="Kannada">Kannada</DropdownItem>
                    <DropdownItem key="Marathi">Marathi</DropdownItem>
                    <DropdownItem key="Portuguese">Portuguese</DropdownItem>
                    <DropdownItem key="Russian">Russian</DropdownItem>
                    <DropdownItem key="Sanskrit">Sanskrit</DropdownItem>
                    <DropdownItem key="Spanish">Spanish</DropdownItem>
                    <DropdownItem key="Tamil">Tamil</DropdownItem>
                    <DropdownItem key="Telugu">Telugu</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <form onSubmit={handleMessageSubmit}>
                <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background pr-8 sm:rounded-md sm:border sm:pr-12">
                  <textarea
                    tabIndex="0"
                    placeholder="Ask a Question."
                    className="min-h-[60px] text-white w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                    spellCheck="false"
                    autoComplete="off"
                    autoCorrect="off"
                    name="message"
                    rows="1"
                    disabled={isTyping}
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
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
