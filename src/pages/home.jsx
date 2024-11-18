import React from "react";
import Navbar from "../components/Navbar";

import Drama from "./Drama";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="pt-20 h-[100vh] w-[100vw] flex">
        <Drama />
      </div>
    </>
  );
}
