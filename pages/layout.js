import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-black py-4">
        <div className="container mx-auto px-4 text-center">Threads</div>
      </header>
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 text-center">
          <p class>Hi</p>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
