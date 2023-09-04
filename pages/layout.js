import React from "react";
import Navbar from "./components/Navbar"; // Import the Navbar component
import PostComponent from "./components/postComponent";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen min-w-screen back overflow-auto flex flex-col items-center justify-center bg-gradient-to-r from-purple-800 to-blue-800 relative">
      <Navbar /> {/* Use the Navbar component here */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 text-center">
          <PostComponent></PostComponent>
        </div>
      </main>
    </div>
  );
};

export default Layout;