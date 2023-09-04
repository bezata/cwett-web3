import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <div className="w-full bg-transparent z-9">
      <nav className="bg-transparent w-full py-1 px-2 flex items-center justify-between">
        <div>Threads</div>

        <div className="absolute right-0 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden">
          <div className="relative">
            <ConnectButton></ConnectButton>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
