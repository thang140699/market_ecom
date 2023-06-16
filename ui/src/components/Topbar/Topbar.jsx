import { message } from "antd";
import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/userAction";
const Topbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const history = useHistory();
  const handleLogout = () => {
    dispatch(logout());
    message.success("Đăng xuất thành công");
  };

  return (
    <div className="header-top-area">
      <div className="container">
        <div className="row">
          <div className="top-content">
            <div className="col-md-6 col-sm-12">
              <div className="header-address">
                <span>Hotline:</span>
                <a href="tel:0123456789"> 0123-456-789</a>
              </div>
              <div className="header-address">
                <span>Email:</span>
                <a href="mailto:admin@admin.vn">admin@admin.vn</a>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="header-menu">
                <ul>
                  {user && user.role === "admin" && (
                    <li>
                      {" "}
                      <a href="/admin/dashboard">Sang trang quản lý</a>
                    </li>
                  )}
                  <li>
                    <a href="#">
                      Ngôn ngữ{" "}
                      <span>
                        Tiếng Việt <i className="fa fa-angle-down" />{" "}
                      </span>
                    </a>
                    <ul>
                      <li>
                        <a href="#">
                          <img src="img/languages/1.jpg" alt="" /> English{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="img/languages/2.jpg" alt="" /> Tiếng Anh{" "}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      Đơn vị{" "}
                      <span>
                        VNĐ <i className="fa fa-angle-down" />{" "}
                      </span>
                    </a>
                    <ul>
                      <li>
                        <a href="#">Dollar(USD)</a>
                      </li>
                      <li>
                        <a href="#">Euro(EUR)</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      Tài khoản <i className="fa fa-angle-down" />{" "}
                    </a>
                    <ul>
                      <li>
                        <a href="/whitelist">Tài khoản của tôi</a>
                      </li>
                      <li>
                        <a href="/whitelist">Danh sách yêu thích</a>
                      </li>
                      <li>
                        <a href="/checkout">Thanh toán</a>
                      </li>
                      <li>
                        {user ? (
                          <a onClick={handleLogout}>Đăng xuất</a>
                        ) : (
                          <a href="/login">Đăng nhập</a>
                        )}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
