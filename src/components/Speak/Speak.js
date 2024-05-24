"use client";
import { Sound, Pause, Play, Stop } from "@/helpers/icons";
import { useState } from "react";

const Speak = ({ message }) => {
  const [flag, setFlag] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const filteredSentence = message
    .replace(/(<([^>]+)>)/gi, "")
    .replaceAll("&quot", "");
  const speech = new SpeechSynthesisUtterance();
  const synth = window.speechSynthesis;

  const onClickPlay = () => {
    if (!isSpeaking) {
      synth.cancel(speech);
      setFlag(false);
    }
    if (!flag) {
      setFlag(true);
      setIsSpeaking(true);
      var voices = synth.getVoices();
      // speech.voice = voices[3]
      speech.lang = "en-US";
      speech.text = filteredSentence;
      speech.volume = 1;
      speech.rate = 1.1;
      speech.pitch = 1.3;
      synth.speak(speech);
    }
  };

  function onClickResume() {
    if (flag) {
      synth.resume();
      setIsSpeaking(true);
    }
  }

  speech.onend = () => {
    setFlag(false);
    setIsSpeaking(false);
  };

  const onClickPause = () => {
    // console.log("onClickPause");
    if (synth.speaking) {
      // console.log("Pausing speech synthesis...");
      synth.pause();
      setIsSpeaking(false);
    }
  };
  

  function onClickStop() {
    if (flag) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setFlag(false);
    }
  }

  return (
    <div className={`flex items-center`}>
      {!flag ? (
        <>
          <span className="sr-only hidden">Start Listening to this</span>
          <button
            className="rounded-[50px]"
            onClick={() => onClickPlay(message)}
          >
            <Sound />
          </button>
        </>
      ) : (
        <div className="rounded-full border-[0.5px] border-[#E8ECEF] px-[5px]">
          {isSpeaking ? (
            <>
              <span className="sr-only hidden">Pause Listening</span>
              <button onClick={() => onClickPause()}>
                <Pause />
              </button>
            </>
          ) : (
            <>
              <span className="sr-only hidden">Resume Listening</span>
              <button onClick={() => onClickResume()}>
                <Play />
              </button>
            </>
          )}
          <>
            <span className="sr-only hidden">Stop Listening</span>
            <button className="ml-2" onClick={() => onClickStop()}>
              <Stop />
            </button>
          </>
        </div>
      )}
    </div>
  );
};

export default Speak;
