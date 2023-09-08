import React, { useState } from "react";
import person from "../images/person.svg";
import Image from "next/image";
import CommentsModals from "./commentModal";

const PostComponent = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const handleLiked = () => {
    setIsLiked((current) => !current);
  };

  return (
    <div className="flex mx-4 my-6 bg-transparent rounded-lg shadow-xl shadow-purple-600/80 md:mx-auto sm:w-128 md:w-128 relative">
      <small className="absolute top-2 right-2 text-xs text-white">
        22h ago
      </small>
      <div className="flex items-start px-4 py-6">
        <Image
          className="object-cover w-12 h-12 mr-4 rounded-full shadow"
          src={person}
          alt="avatar"
        />
        <div className="">
          <div className="flex items-start flex-col">
            {" "}
            <h2 className="text-lg font-semibold text-white mt-3">A</h2>{" "}
            <p className="text-md text-white mt-2">Hi!</p>
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
              <span>12</span>
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
              <span>8</span>
            </button>
          </div>
        </div>
      </div>{" "}
      {openCommentsModal && (
        <CommentsModals setOpenCommentsModal={setOpenCommentsModal} />
      )}
    </div>
  );
};

export default PostComponent;
