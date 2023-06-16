import React from "react";
import Sidebar from "../Sidebar";
import { AiOutlineHeart } from "react-icons/ai";
const Menu = ({ type }) => {
  return (
    <div className="header-bottom">
      <div className="container">
        <div className="row">
          <Sidebar type={type} />
          <div className="col-md-9">
            <div className="mainmenu hidden-xs">
              <ul>
                <li>
                  <a href="/">Trang chủ</a>
                </li>
                <li>
                  <a href="/products">Cửa hàng</a>
                </li>
                <li>
                  <a href="blog-right-sidebar.html">Tin tức</a>
                </li>
                <li>
                  <a href="/whitelist">
                    Danh sách yêu thích{" "}
                    <AiOutlineHeart style={{ fontSize: 15, paddingTop: 1 }} />
                  </a>
                </li>
              </ul>
            </div>
            <div id="mobileMenu" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
