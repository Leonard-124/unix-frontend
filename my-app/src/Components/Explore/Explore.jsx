import React from "react";
import Navbar from "../../Pages/Navbar";
import Footer from "../Footer";
import Tradeacc from "../Waste/Tradeacc/Tradeacc";
import Artacc from "./Artacc/Artacc";
import Blogs from "./Blogs";

const Explore = () => {
  return (
    <>
      <Navbar />
      <Tradeacc />
      <Artacc />
      <Blogs />
      <Footer />
    </>
  );
};

export default Explore;
