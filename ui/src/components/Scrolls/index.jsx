import React from "react";

const Scrolls = () => {
  return (
    <div className="scroll-item">
      <nav className="collapse navbar-collapse">
        <ul>
          <li>
            <a href="#electronics" className="smooth">
              <img src="img/icon/icon_electronics.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="#fashion" className="smooth">
              <img src="img/icon/icon_fashion.jpg" alt="" />
            </a>
          </li>
          {/* <li>
            <a href="#furniture" className="smooth">
              <img src="img/icon/icon_Furniture.jpg" alt="" />
            </a>
          </li>
          <li>
            <a href="#accessories" className="smooth">
              <img src="img/icon/icon_sunglass.jpg" alt="" />
            </a>
          </li> */}
          <li id="scrollUp">
            {" "}
            <a href="#">
              <i className="fa fa-angle-double-up" />
              <span>Đầu trang</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Scrolls;
