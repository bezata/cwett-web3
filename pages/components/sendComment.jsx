import React from "react";
import Image from "next/image";
import person from "../images/person.svg";

const SendComment = () => {
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
          ></textarea>
          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-purple-600 hover:text-purple-400 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <button className="px-3 py-2 text-base font-bold text-white transition duration-500 ease-in-out bg-purple-600 rounded-full hover:bg-opacity-100 text-opacity-90 hover:text-opacity-100 focus:outline-none">
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
