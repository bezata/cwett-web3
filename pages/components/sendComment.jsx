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
import { toast } from "react-toastify";

const contract = "0x077b173cC02a20A5Fe1bad133b952fF581799b36";
const CweetABI = abi;
const SendComment = (ID) => {
  const [CommentText, setCommentText] = useState("");
  const [newID, setNewID] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [Error, setIsError] = useState(false);
  const { data: walletClient } = useWalletClient();
  const notify = (message, type = "info") => {
    const options = {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    };
    switch (type) {
      case "error":
        toast.error(message, options);
        break;
      case "success":
        toast.success(message, options);
        break;
      case "info":
        toast.info(message, options);
        break;
      case "warn":
        toast.warn(message, options);
        break;
      default:
        toast(message, options);
    }
  };

  const { config: sendComment } = usePrepareContractWrite({
    address: contract,
    abi: CweetABI,
    functionName: "addComment",
    args: [newID, CommentText],
  });

  useEffect(() => {
    setNewID(ID.ID);
  }, [ID]);
  const {
    write: sendComments,
    isSuccess,
    isLoading,
    isError,
  } = useContractWrite(sendComment);

  const handleComment = async () => {
    if (walletClient?.account.address === undefined) {
      notify("Please connect wallet to comment.", "error");
    }
    if (walletClient?.account.address != undefined) {
      if (CommentText.trim().length > 0) {
        try {
          await sendComments?.();
        } catch (error) {
          console.error("Error when commenting:", error);
        }
      } else {
        notify("Comment text cannot be empty.", "error");
      }
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
      notify("Commenting...", "info");
    }
    if (Success === true) {
      notify("Commented Successfully", "success");
      setCommentText("");
    }
    if (Error === true) {
      notify("Comment Cancelled", "error");
    }
  }, [Success, Loading, Error]);
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
