import React from "react";
import Navbar from "./components/navbar.jsx"; // Import the Navbar component
import PostComponent from "./components/postComponent";
import SendTweet from "./components/sendTweet.jsx";

const Layout = ({ children }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-auto min-w-screen bg-gradient-to-r from-purple-800/80 to-blue-800/60 ">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto text-center ">
          <SendTweet></SendTweet>
          <PostComponent></PostComponent>
        </div>
      </main>
    </div>
  );
};

export default Layout;
