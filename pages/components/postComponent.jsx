import React, { useState, useEffect } from "react";
import person from "../images/person.svg";
import Image from "next/image";
import CommentsModals from "./commentModal";
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
const PostComponent = ({
  user,
  likeCount,
  cweet,
  commentCount,
  timeStamp,
  cweetID,
  notify,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");
  const [likeValue, setLikeValue] = useState(false);
  const [isUserLikedCwett, setIsUserLikedCwett] = useState("");

  const { data: walletClient } = useWalletClient();
  const { data: isUserLiked } = useContractRead({
    address: contract,
    abi: CweetABI,
    functionName: "cwettLikes",
    args: [cweetID, walletClient?.account.address],
    watch: true,
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
  useEffect(() => {
    setIsUserLikedCwett(isUserLiked?.[1]);
  }, [isUserLiked]);
  const {
    write: like,
    isSuccess: likeSuccessful,
    isError: errorLike,
    isLoading: likeLoading,
  } = useContractWrite(likes);
  const {
    write: unlike,
    isSuccess: unlikeSuccesful,
    isError: errorUnlike,
    isLoading: unlikeLoading,
  } = useContractWrite(unlikes);
  useEffect(() => {
    if (isUserLikedCwett != undefined) {
      setLikeValue(isUserLikedCwett);
    }
  }, [isUserLikedCwett]);

  useEffect(() => {
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

  useEffect(() => {
    if (likeLoading === true) {
      notify("Liking...", "info");
    }
    if (unlikeLoading === true) {
      notify("Unliking...", "info");
    }
    if (likeSuccessful === true) {
      notify("Liked Successfully", "success");
    }
    if (unlikeSuccesful === true) {
      notify("Unliked Successfully", "success");
    }
    if (errorLike === true) {
      notify("Like Cancelled", "error");
    }
    if (errorUnlike === true) {
      notify("Unlike Cancelled", "error");
    }
  }, [
    likeLoading,
    unlikeLoading,
    likeSuccessful,
    unlikeSuccesful,
    errorLike,
    errorUnlike,
  ]);

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
            <button
              onClick={() => setOpenCommentsModal(true)}
              className="flex mr-2 text-sm text-white-700"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-1"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <span>{commentCount}</span>
            </button>
          </div>
        </div>
      </div>{" "}
      {openCommentsModal && (
        <CommentsModals
          setOpenCommentsModal={setOpenCommentsModal}
          ID={cweetID}
          account={user}
          notify={notify}
        />
      )}
      {openProfileModal && (
        <UserProfileModal
          setOpenProfileModal={setOpenProfileModal}
          account={user}
        ></UserProfileModal>
      )}
    </div>
  );
};

export default PostComponent;
