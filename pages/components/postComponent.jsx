import React from "react";
import { useState } from "react";

const PostComponent = () => {
  const [isLiked, setIsLiked] = useState(false);
  const handleLiked = () => {
    setIsLiked((current) => !current);
  };
  return (
    <div className="flex bg-transparent shadow-xl shadow-purple-600/80 rounded-lg mx-4 md:mx-auto my-6 max-w-md md:max-w-2xl ">
      <div className="flex items-start px-4 py-6">
        <img
          className="w-12 h-12 rounded-full object-cover mr-4 shadow"
          src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt="avatar"
        />
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white -mt-1">
              Brad Adams{" "}
            </h2>
            <small className="text-sm text-white">22h ago</small>
          </div>

          <p className="mt-3 text-white text-sm">
            Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit
            amet!
          </p>
          <div className="mt-4 flex items-center">
            <button
              onClick={handleLiked}
              className="flex mr-2 text-white text-sm "
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
            <button className="flex mr-2 text-white-700 text-sm ">
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
      </div>
    </div>
  );
};

export default PostComponent;
