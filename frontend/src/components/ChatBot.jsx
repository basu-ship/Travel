import { useState } from "react";
import chatbotIcon from "../assets/chatbot.png";

const ChatBot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed
          bottom-6
          right-6
          w-16
          h-16
          rounded-full
          shadow-2xl
          z-50
          overflow-hidden
          hover:scale-110
          transition
        "
      >
        <img
          src={chatbotIcon}
          alt="ChatBot"
          className="w-full h-full object-cover"
        />
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="
        fixed
        bottom-24
        right-4
        left-4
        md:left-auto
        md:w-[380px]
        h-[70vh]
        max-h-[550px]
        bg-[#0B1120]
        border
        border-white/10
        rounded-3xl
        shadow-2xl
        z-50
        flex
        flex-col
        overflow-hidden
        "
        >
          {/* Header */}
          <div
            className="
              flex
              items-center
              justify-between
              px-5
              py-4
              border-b
              border-white/10
            "
          >
            <div className="flex items-center gap-3">
              <img
                src={chatbotIcon}
                alt="bot"
                className="w-10 h-10 rounded-full"
              />

              <div>
                <h2 className="text-white font-bold">
                  OnePass Assistant
                </h2>

                <p className="text-green-400 text-xs">
                  Online
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-white text-xl"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            className="
              flex-1
              overflow-y-auto
              p-4
              space-y-3
            "
          >
            <div className="flex">
              <div
                className="
                  bg-white/10
                  text-white
                  px-4
                  py-3
                  rounded-2xl
                  max-w-[80%]
                "
              >
                👋 Hello! Welcome to OnePass.
                <br />
                How can I help you today?
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div
            className="
              border-t
              border-white/10
              p-3
              flex
              gap-2
            "
          >
            <input
              type="text"
              placeholder="Ask something..."
              className="
                flex-1
                px-4
                py-3
                rounded-xl
                bg-white/10
                text-white
                placeholder-gray-400
                outline-none
              "
            />

            <button
              className="
                px-5
                rounded-xl
                bg-yellow-500
                text-black
                font-semibold
              "
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;