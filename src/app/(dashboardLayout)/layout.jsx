import Sidebar from "@/components/dashboard/Sidebar";
import Footer from "@/components/Footer";
import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <div>
        <Sidebar />
      </div>
      <main>{children}</main>
    </>
  );
};

export default layout;
