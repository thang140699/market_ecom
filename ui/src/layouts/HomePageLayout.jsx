import React from "react";
import HomePage from "../pages/home";
import Scrolls from "../components/Scrolls";
import Footer from "../pages/home/footer";
const HomePageLayout = () => {
  return (
    <div>
      <Scrolls />
      <HomePage />
      <Footer />
    </div>
  );
};

export default HomePageLayout;
