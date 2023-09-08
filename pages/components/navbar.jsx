import React from "react";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import cweetlogo from "../images/cweetlogo.png";
import person from "../images/person.svg";

import UserProfileModal from "./profileModal";

const Navbar = () => {
  const [openProfileModal, setOpenProfileModal] = useState(false);
  return (
    <div className="w-full bg-transparent z-9 ">
      <nav className="flex items-center justify-between w-full px-2 py-2 bg-transparent">
        <Image src={cweetlogo} alt="cweetlogo" width={100} height={100} />
        <div className="absolute rounded-full shadow-lg left-1/2 shadow-purple-700">
          <button onClick={() => setOpenProfileModal(true)} className="">
            <Image
              src={person}
              className=""
              alt="Profile"
              width={50}
              height={50}
            />
            <p className="text-xs font-bold shadow-lg rounded-b-md ">User</p>
          </button>
        </div>
        <div className="mb-4 ml-auto">
          <ConnectButton></ConnectButton>
        </div>
      </nav>
      {openProfileModal && (
        <UserProfileModal
          setOpenProfileModal={setOpenProfileModal}
        ></UserProfileModal>
      )}
    </div>
  );
};

export default Navbar;
