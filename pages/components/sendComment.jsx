import React, { useEffect } from "react";
import Image from "next/image";
import person from "../images/person.svg";
import abi from "../contracts/CweetABI.json";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWalletClient,
} from "wagmi";
import { useState } from "react";

const contract = "0x641B540A367fe708a47cd709EFE8e5834fdC49AF";
const CweetABI = abi;
const SendComment = (ID) => {
  const [CommentText, setCommentText] = useState("");
  const [newID, setNewID] = useState("");

  const { config: sendComment } = usePrepareContractWrite({
    address: contract,
    abi: CweetABI,
    functionName: "addComment",
    args: [newID, CommentText],
  });

  useEffect(() => {
    setNewID(ID.ID);
  }, [ID]);
  const { write: sendComments } = useContractWrite(sendComment);

  const handleComment = async () => {
    try {
      await sendComments?.();
    } catch (error) {
      console.error("Error when commenting:", error);
    }
  };
  return (
    <div className="mx-auto transform -translate-y-5 bg-transparent shadow-xl w-100 md:w-10/12 mt-11 sm:w-10/12  border border-purple-800 rounded-2xl">
      <section className="p-3 border-b border-gray-600"></section>
      <section className="flex w-full px-3 py-2">
        <div className="mr-1">
          <Image src={person} alt="avatar" width={50} height={50} />
        </div>
        <div className="flex-1">
          <textarea
            className="w-full p-2 text-white placeholder-white bg-transparent outline-none resize-none"
            rows="4"
            placeholder="What's happening?"
            value={CommentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <div className="flex"></div>
            <div>
              <button
                onClick={() => handleComment()}
                className="px-3 py-2 text-base font-bold text-white transition duration-500 ease-in-out bg-purple-600 rounded-full hover:bg-opacity-100 text-opacity-90 hover:text-opacity-100 focus:outline-none"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SendComment;
