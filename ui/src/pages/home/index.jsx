import React from "react";
import Banner from "../../components/Banner";
import Menu from "../../components/Header/Menu";
import Search from "../../components/Header/Search";
import Popular from "../../components/HomePage/Popular";

import Promotion from "../../components/Topbar/Promotion";
import Topbar from "../../components/Topbar/Topbar";

const HomePage = () => {
  return (
    <>
      <Promotion />
      <header>
        <Topbar />
        <Search />
        <Menu type="home" />
      </header>
      <Banner />
      <Popular />
    </>
  );
};

export default HomePage;
