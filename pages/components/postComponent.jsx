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

// Contract address and ABI 
const contract = "0x077b173cC02a20A5Fe1bad133b952fF581799b36";
const CweetABI = abi;

// PostComponent component to display a cweet
const PostComponent = ({
  user,
  likeCount,
  cweet,
  commentCount,
  timeStamp,
  cweetID,
  notify,
}) => {
  // State variables for the post component
  const [isLiked, setIsLiked] = useState(false);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");
  const [likeValue, setLikeValue] = useState(false);
  const [isUserLikedCwett, setIsUserLikedCwett] = useState("");
  const [errorsUnlike, setErrorsUnlike] = useState(false);
  const [errorsLike, setErrorsLike] = useState(false);
  const [loadingUnlike, setLoadingUnlike] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [successUnlike, setSuccessUnlike] = useState(false);
  const [successLike, setSuccessLike] = useState(false);

  // Get wallet client data and ,,
  const { data: walletClient } = useWalletClient();

  // Check if the user liked the cweet and update the state
  const { data: isUserLiked } = useContractRead({
    address: contract,
    abi: CweetABI,
    functionName: "cwettLikes",
    args: [cweetID, walletClient?.account.address],
    watch: true,
  });

  // Calculate and set the time ago for the cweet
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

  // Prepare contract write for liking and unliking a cweet
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

  // Use contract write for liking and unliking and get loading, success, and error states
  const {
    write: like,
    isSuccess: likeSuccessful,
    isError: errorLike,
    isLoading: likeLoading,
  } = useContractWrite(likes);

  const {
    write: unlike,
    isSuccess: unlikeSuccessful,
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
  }, [likeValue]);

  // Handle liking and unliking 
  const handleLiked = async () => {
    if (walletClient?.account.address != undefined) {
      if (
        successLike == false ||
        successUnlike == false ||
        loadingLike == false ||
        loadingUnlike == false
      ) {
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
      } else {
        notify("Please wait for the transaction to complete", "error");
      }
    }
    if (walletClient?.account.address == undefined) {
      notify("Please connect your wallet", "error");
    }
  };

  // Handle loading, success, and error states for liking and unliking and make sure that the states are reset after each action
  useEffect(() => {
    setLoadingLike(likeLoading);
    setLoadingUnlike(unlikeLoading);
    setSuccessLike(likeSuccessful);
    setSuccessUnlike(unlikeSuccessful);
    setErrorsLike(errorLike);
    setErrorsUnlike(errorUnlike);

    if (loadingLike === true) {
      setLoadingLike(false);
    }
    if (loadingUnlike === true) {
      setLoadingUnlike(false);
    }
    if (successLike === true) {
      setSuccessLike(false);
    }
    if (successUnlike === true) {
      setSuccessUnlike(false);
    }
    if (errorsLike === true) {
      setErrorsLike(false);
    }
    if (errorsUnlike === true) {
      setErrorsUnlike(false);
    }
  }, [
    likeLoading,
    unlikeLoading,
    likeSuccessful,
    unlikeSuccessful,
    errorLike,
    errorUnlike,
  ]);

  // Show toast notifications for liking and unliking based on loading, success, and error states
  useEffect(() => {
    if (loadingLike === true) {
      notify("Liking...", "info");
    }
    if (loadingUnlike === true) {
      notify("Unliking...", "info");
    }
    if (successUnlike === false && successLike === true) {
      notify("Liked Successfully", "success");
    }
    if (successLike === false && successUnlike === true) {
      notify("Unliked Successfully", "success");
    }
    if (errorsLike === true) {
      notify("Like Cancelled", "error");
    }
    if (errorsUnlike === true) {
      notify("Unlike Cancelled", "error");
    }
  }, [
    loadingLike,
    loadingUnlike,
    successLike,
    successUnlike,
    errorsLike,
    errorsUnlike,
  ]);

  return (
    <div className="flex mx-4 my-6 bg-transparent rounded-lg shadow-xl shadow-purple-600/80 md:mx-auto sm:w-128 md:w-128 relative">
      {/* Display time ago */}
      <small className="absolute top-2 right-2 text-xs text-white">
        {timeAgo}
      </small>
      <div className="flex items-start px-4 py-6">
        <button onClick={() => setOpenProfileModal(true)}>
          {/* Display user avatar */}
          <Image
            className="object-cover w-12 h-12 mr-4 rounded-full shadow"
            src={person}
            alt="avatar"
          />
        </button>
        <div className="">
          <div className="flex items-start flex-col">
            {/* Display user's username */}
            <h2 className="text-lg font-semibold text-white mt-3">{user}</h2>
            {/* Display cweet content */}
            <p className="text-md text-white mt-2">{cweet}</p>
          </div>

          <div className="flex items-center mt-4">
            {/* Like button */}
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
            {/* Comment button */}
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
        // Display the CommentsModals component when the comment button is clicked
        <CommentsModals
          setOpenCommentsModal={setOpenCommentsModal}
          ID={cweetID}
          account={user}
          notify={notify}
        />
      )}
      {openProfileModal && (
        // Display the UserProfileModal component when the user avatar is clicked
        <UserProfileModal
          setOpenProfileModal={setOpenProfileModal}
          account={user}
        ></UserProfileModal>
      )}
    </div>
  );
};

export default PostComponent;
