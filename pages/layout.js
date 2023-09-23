import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar.jsx"; // Import the Navbar component
import PostComponent from "./components/postComponent";
import SendTweet from "./components/sendTweet.jsx";
import abi from "./contracts/CweetABI.json";
import { useContractRead, useAccount } from "wagmi";

import Link from "next/link.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const contract = "0x077b173cC02a20A5Fe1bad133b952fF581799b36";
const CweetABI = abi;

const Layout = () => {
  // Define state to store the list of cweets and update it
  const [cweets, setCweet] = useState([]);

  // Get the user's account information using the useAccount hook and update the state
  const account = useAccount({
    onConnect({ address }) {
      // Notify the user when they connect their wallet successfully to the DAPP
      notify(`Connected with ${address}`, "success");
    },
    onDisconnect() {
      // Notify the user to connect their wallet when it's disconnected from the DAPP
      notify("Please Connect Your Wallet to use DAPP's features", "warn");
    },
  });

  // Fetch the list of cweets using the useContractRead hook and update the state
  const { data: cweet } = useContractRead({
    address: contract,
    abi: CweetABI,
    functionName: "getAllCwetts",
    watch: true,
  });

  // Update the cweets state when new data is received from the blockchain
  useEffect(() => {
    setCweet(cweet);
  }, [cweet]);

  // Define a function to show toast notifications using react-toastify
  const notify = (message, type = "info") => {
    const options = {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    };
    switch (type) {
      case "error":
        toast.error(message, options);
        break;
      case "success":
        toast.success(message, options);
        break;
      case "info":
        toast.info(message, options);
        break;
      case "warn":
        toast.warn(message, options);
        break;
      default:
        toast(message, options);
    }
  };

  // Check if the user is connected to a wallet and notify if not connected
  useEffect(() => {
    if (!account) {
      notify("Please Connect Your Wallet to use DAPP's features", "warn");
    }
  }, [account]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-auto min-w-screen bg-gradient-to-r from-purple-800/80 to-blue-800/60 ">
      {/* Render the Navbar component and pass the notify function as a prop */}
      <Navbar notify={notify} />

      <main className="flex-grow w-1/2">
        <div className="container mx-auto text-center ">
          {/* Render the SendTweet component and pass the notify function as a prop */}
          <SendTweet notify={notify} />

          {/* Map through the list of cweets and render each PostComponent  */}
          {cweets?.map((latestCweet, index) => (
            <PostComponent
              key={index}
              cweetID={index}
              user={latestCweet.userAddress || ""}
              cweet={latestCweet.cwettText || ""}
              timeStamp={latestCweet.timestamp?.toString() || ""}
              likeCount={latestCweet.likes?.toString() || "0"}
              commentCount={latestCweet.commentsCount?.toString() || "0"}
              notify={notify} // Pass the notify function to PostComponent
            />
          ))}
        </div>
      </main>

      <div className="justify-between bottom-0 right-0 text-xs text-white mr-2 mb-2">
        <Link href="https://github.com/bezata/cwett-web3" target="noblank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.20-.82 2.20-.82.44 1.10.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.20 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </Link>
      </div>
      {/* Render the ToastContainer for toast notifications */}
      <ToastContainer theme="dark"></ToastContainer>
    </div>
  );
};

export default Layout;
