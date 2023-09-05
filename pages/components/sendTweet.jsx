import React from "react";
import Image from "next/image";
import person from "../images/person.svg";

const SendTweet = () => {
  return (
    <div class="w-100 mx-auto md:w-10/12 mt-11 sm:w-10/12 bg-transparent shadow-xl shadow-purple-800/90 rounded-2xl transform -translate-y-5">
      <section class="p-3 border-b border-gray-600"></section>
      <section class="w-full flex px-3 py-2">
        <div class="mr-1">
          <Image src={person} alt="avatar" width={50} height={50} />
        </div>
        <div class="flex-1">
          <textarea
            class="w-full p-2 bg-transparent outline-none  placeholder-white text-white resize-none"
            rows="4"
            placeholder="What's happening?"
          ></textarea>
          <div class="flex items-center justify-between pt-2 border-t border-gray-700">
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-purple-600 hover:text-purple-400 cursor-pointer"
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
              <button class="transition duration-500 ease-in-out bg-purple-600  hover:bg-opacity-100 text-white text-opacity-90 hover:text-opacity-100 py-2 px-3 rounded-full text-base font-bold focus:outline-none">
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
