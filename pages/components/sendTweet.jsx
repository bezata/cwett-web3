import React, { useEffect } from "react";
import Image from "next/image";
import person from "../images/person.svg";
import { useState } from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import abi from "../contracts/CweetABI.json";

const contract = "0x077b173cC02a20A5Fe1bad133b952fF581799b36";
const CweetABI = abi;
const SendTweet = ({ notify }) => {
  const [CweetText, setCweetText] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [Error, setIsError] = useState(false);
  const { config: cweet } = usePrepareContractWrite({
    address: contract,
    abi: CweetABI,
    functionName: "createCwett",
    args: [CweetText],
  });
  const {
    write: sendCweet,
    isSuccess,
    isLoading,
    isError,
  } = useContractWrite(cweet);

  const handleCweet = async () => {
    if (CweetText.trim().length > 0) {
      await sendCweet?.();
      try {
      } catch (error) {
        console.error("Error when cweeting:", error);
      }
    } else {
      notify("Cwett text cannot be empty.", "error");
    }
  };

  useEffect(() => {
    setLoading(isLoading);
    setSuccess(isSuccess);
    setIsError(isError);
    if (Loading === true) {
      setLoading(false);
    }
    if (Success === true) {
      setSuccess(false);
    }
    if (Error === true) {
      setIsError(false);
    }
  }, [isLoading, isSuccess, isError]);

  useEffect(() => {
    if (Loading === true) {
      notify("Cweeting...", "info");
    }
    if (Success === true) {
      notify("Cweeted Successfully", "success");
      setCweetText("");
    }
    if (Error === true) {
      notify("Cwett Cancelled", "error");
    }
  }, [Success, Loading, Error]);

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
            required
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
