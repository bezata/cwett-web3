import React from "react";
import Image from "next/image";
import person from "../images/person.svg";
import CommentsCard from "./comments";
import SendComment from "./sendComment";
import { usePrepareContractWrite } from "wagmi";

const CommentsModals = ({ setOpenCommentsModal, ID, account }) => {
  const handleCloseCommentsModal = () => {
    setOpenCommentsModal(false);
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-gradient-to-r from-purple-800 to-blue-800">
      <div className="flex md:w-auto w-[90%] mx-auto items-center justify-center min-h-screen">
        <div className="absolute inset-0"></div>
        <div className="transparent shadow-purple-600/90 hover:shadow-purple-700/90 rounded-lg overflow-hidden shadow-xl z-50 relative">
          <div className="p-6 min-w-[18.75rem] flex flex-col items-center">
            <Image
              src={person}
              className="rounded-full shadow-lg shadow-purple-600/90"
              alt="Profile"
              width={50}
              height={50}
            />
            <h1 className="text-lg font-semibold text-center mb-1 text-white">
              Comments
            </h1>{" "}
            <div className="shadow shadow-purple-600 rounded-b-xl mt-3 flex flex-col items-center border border-purple-600 justify-center">
              <h2 className="text-xs font-semibold mt-5 text-white">
                User Address: {account}
              </h2>

              <h4 className="text-xs font-semibold mb-5 text-white">
                Posts: 3
              </h4>
            </div>
            <div className="flex gap-2 relative"></div>{" "}
            <SendComment></SendComment>
            <div className="flex flex-row mt-10 justify-between">
              <button
                onClick={handleCloseCommentsModal}
                className="absolute top-3 right-3 text-white hover:text-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>{" "}
            </div>
            <CommentsCard></CommentsCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsModals;
