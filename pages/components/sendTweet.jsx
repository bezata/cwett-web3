import React from "react";
import Image from "next/image";
import person from "../images/person.svg";
import { useState } from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import abi from "../contracts/CweetABI.json";

const contract = "0x8286fdBEbCB0df8e5aaB88f9dAde8448058e49a3";
const CweetABI = abi;
const SendTweet = () => {
  const [CweetText, setCweetText] = useState("");

  const { config: cweet } = usePrepareContractWrite({
    address: contract,
    abi: CweetABI,
    functionName: "createCwett",
    args: [CweetText],
  });
  const { write: sendCweet } = useContractWrite(cweet);

  const handleCweet = async () => {
    try {
      await sendCweet?.();
    } catch (error) {
      console.error("Error when cweeting:", error);
    }
  };

  return (
    <div className="mx-auto transform -translate-y-5 bg-transparent  w-100 md:w-10/12 mt-11 sm:w-10/12 shadow-xl shadow-purple-800 border border-purple-800 rounded-2xl">
      <section className="p-3 border-b border-purple-800 shadow shadow-purple-800"></section>
      <section className="flex w-full px-3 py-2">
        <div className="mr-1">
          <Image src={person} alt="avatar" width={50} height={50} />
        </div>
        <div className="flex-1">
          <textarea
            className="w-full p-2 text-white placeholder-white bg-transparent outline-none resize-none"
            rows="4"
            placeholder="What's happening?"
            value={CweetText}
            onChange={(e) => setCweetText(e.target.value)}
          ></textarea>
          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <div className="flex"></div>
            <div>
              <button
                onClick={handleCweet}
                className="px-3 py-2 text-base font-bold text-white transition duration-500 ease-in-out bg-purple-600 rounded-full hover:bg-opacity-100 text-opacity-90 hover:text-opacity-100 focus:outline-none"
              >
                Cwett
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SendTweet;
