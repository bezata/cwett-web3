import React, { useState, useEffect } from "react";
import person from "../images/person.svg";
import Image from "next/image";
import abi from "../contracts/CweetABI.json";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWalletClient,
  useContractRead,
} from "wagmi";
import UserProfileModal from "./profileModal";

const contract = "0x641B540A367fe708a47cd709EFE8e5834fdC49AF";
const CweetABI = abi;
const CommentsCard = ({ user, likeCount, cweet, timeStamp, cweetID }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");
  const [likeValue, setLikeValue] = useState(false);
  const { data: walletClient } = useWalletClient();
  const { data: isUserLiked } = useContractRead({
    address: contract,
    abi: CweetABI,
    functionName: "cwettLikes",
    args: [cweetID, walletClient?.account.address],
  });

  useEffect(() => {
    const currentTime = new Date().getTime() / 1000;
    const postTime = parseInt(timeStamp);

    const timeDifference = currentTime - postTime;

    if (timeDifference < 60) {
      setTimeAgo(`${Math.floor(timeDifference)} seconds ago`);
    } else if (timeDifference < 3600) {
      setTimeAgo(`${Math.floor(timeDifference / 60)} minutes ago`);
    } else if (timeDifference < 86400) {
      setTimeAgo(`${Math.floor(timeDifference / 3600)} hours ago`);
    } else {
      setTimeAgo(`${Math.floor(timeDifference / 86400)} days ago`);
    }
  }, [timeStamp]);

  const { config: likes } = usePrepareContractWrite({
    address: contract,
    abi: CweetABI,
    functionName: "likeCwett",
    args: [cweetID],
  });
  const { config: unlikes } = usePrepareContractWrite({
    address: contract,
    abi: CweetABI,
    functionName: "unlikeCwett",
    args: [cweetID],
  });
  const { write: like } = useContractWrite(likes);
  const { write: unlike } = useContractWrite(unlikes);

  useEffect(() => {
    if (isUserLiked != undefined) {
      setLikeValue(isUserLiked[1]);
    }
    if (likeValue === true) {
      setIsLiked(true);
    } else if (likeValue === false) {
      setIsLiked(false);
    }
  }, [isUserLiked, likeValue]);
  const handleLiked = async () => {
    if (walletClient != undefined) {
      try {
        if (!isLiked) {
          await like?.();
        }
        if (isLiked) {
          await unlike?.();
        }
      } catch (error) {
        console.error("Error when liking/unliking:", error);
      }
    }
  };

  return (
    <div className="flex mx-4 my-6 bg-transparent rounded-lg shadow-xl shadow-purple-600/80 md:mx-auto sm:w-128 md:w-128 relative">
      <small className="absolute top-2 right-2 text-xs text-white">
        {timeAgo}
      </small>
      <div className="flex items-start px-4 py-6">
        <button onClick={() => setOpenProfileModal(true)}>
          <Image
            className="object-cover w-12 h-12 mr-4 rounded-full shadow"
            src={person}
            alt="avatar"
          />
        </button>
        <div className="">
          <div className="flex items-start flex-col">
            <h2 className="text-lg font-semibold text-white mt-3">{user}</h2>
            <p className="text-md text-white mt-2">{cweet}</p>
          </div>

          <div className="flex items-center mt-4">
            <button
              onClick={handleLiked}
              className="flex mr-2 text-sm text-white"
            >
              <svg
                fill={isLiked ? "#EEFFFF" : "none"}
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-1"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{likeCount}</span>
            </button>
          </div>
        </div>
      </div>{" "}
      {openProfileModal && (
        <UserProfileModal
          setOpenProfileModal={setOpenProfileModal}
          account={user}
        ></UserProfileModal>
      )}
    </div>
  );
};

export default CommentsCard;
