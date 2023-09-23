import React, { useEffect } from "react";
import Image from "next/image";
import person from "../images/person.svg";
import { useState } from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import abi from "../contracts/CweetABI.json";
import { useWalletClient } from "wagmi";

const contract = "0x077b173cC02a20A5Fe1bad133b952fF581799b36";
const CweetABI = abi;
const SendTweet = ({ notify }) => {
  // State to store the text of the Cwett
  const [CweetText, setCweetText] = useState("");
  // State to manage loading state
  const [Loading, setLoading] = useState(false);
  // State to manage success state
  const [Success, setSuccess] = useState(false);
  // State to manage error state
  const [Error, setIsError] = useState(false);
  // Fetch wallet client data
  const { config: cweet } = usePrepareContractWrite({
    address: contract,
    abi: CweetABI,
    functionName: "createCwett",
    args: [CweetText],
  });
  const { data: walletClient } = useWalletClient();
  // Write the Cwett to the blockchain
  const {
    write: sendCweet,
    isSuccess,
    isLoading,
    isError,
  } = useContractWrite(cweet);

  // Function to handle Cwetting
  const handleCweet = async () => {
    if (walletClient?.account.address === undefined) {
      // Notify if the wallet is not connected
      notify("Please connect wallet to cweet.", "error");
    }
    if (walletClient?.account.address != undefined) {
      if (CweetText.trim().length > 0) {
        // If Cwett text is not empty, send the Cwett
        await sendCweet?.();
        try {
        } catch (error) {
          console.error("Error when cweeting:", error);
        }
      } else {
        // Notify if the Cwett text is empty
        notify("Cwett text cannot be empty.", "error");
      }
    }
  };

  // Update state based on loading, success, and error states
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

  // Notify based on loading, success, and error states
  useEffect(() => {
    if (Loading === true) {
      notify("Cweeting...", "info");
    }
    if (Success === true) {
      notify("Cweeted Successfully", "success");
      // Reset the Cwett text on success
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
