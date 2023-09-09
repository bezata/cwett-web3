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

const contract = "0x077b173cC02a20A5Fe1bad133b952fF581799b36";
const CweetABI = abi;
const CommentsCard = ({ user, cweet, timeStamp }) => {
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");
  const { data: walletClient } = useWalletClient();

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
          <div className="flex items-center mt-4"></div>
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
