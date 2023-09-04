import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import cweetlogo from "../images/cweetlogo.png";

const Navbar = () => {
  return (
    <div className="w-full bg-transparent  z-9">
      <nav className="bg-transparent w-full  py-2 px-2 flex items-center justify-between">
        <Image src={cweetlogo} alt="cweetlogo" width={100} height={100} />

        {/* <div className="absolute inline-flex items-center justify-center  overflow-hidden"> */}
        <div className=" ml-auto mb-8">
          <ConnectButton></ConnectButton>
        </div>
        {/* </div> */}
      </nav>
    </div>
  );
};

export default Navbar;
