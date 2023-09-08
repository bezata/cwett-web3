import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar.jsx"; // Import the Navbar component
import PostComponent from "./components/postComponent";
import SendTweet from "./components/sendTweet.jsx";
import abi from "./contracts/CweetABI.json";
import { useContractRead } from "wagmi";
import { usePrepareContractWrite } from "wagmi";

const contract = "0x8286fdBEbCB0df8e5aaB88f9dAde8448058e49a3";
const CweetABI = abi;

const Layout = () => {
  const [cweetCounts, setCweetCount] = useState("0");
  const [cweets, setCweet] = useState([]);
  const { data: cweetCount } = useContractRead({
    address: contract,
    abi: CweetABI,
    functionName: "CwettCount",
  });

  useEffect(() => {
    if (cweetCount !== undefined) {
      setCweetCount(cweetCount.toString() - 1);
    }
  }, [cweetCount]);

  const { data: cweet } = useContractRead({
    address: contract,
    abi: CweetABI,
    functionName: "getAllCwetts",
    watch: true,
  });

  useEffect(() => {
    setCweet(cweet);
  }, [cweet]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-auto min-w-screen bg-gradient-to-r from-purple-800/80 to-blue-800/60 ">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto text-center ">
          <SendTweet />
          {cweets.map((latestCweet, index) => (
            <PostComponent
              key={index}
              cweetID={index}
              user={latestCweet.userAddress || ""}
              cweet={latestCweet.cwettText || ""}
              timeStamp={latestCweet.timestamp?.toString() || ""}
              likeCount={latestCweet.likes?.toString() || "0"}
              commentCount={latestCweet.commentsCount?.toString() || "0"}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Layout;
