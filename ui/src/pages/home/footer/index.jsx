import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../../actions/feedbackAction";
import { CREATE_FEEDBACK_SUCCESS } from "../../../constants/feedbackConstants";

const Footer = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newFeedback);
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      message.success("Gửi thành công");
      dispatch({ type: CREATE_FEEDBACK_SUCCESS });
    }
  }, [dispatch, message, error, success]);

  const onFinish = (values) => {
    console.log(values);
    // dispatch(createSupplier(values));
  };
  return (
    <footer className="footer-area mt-40">
      <div className="newsletter-area">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="newsletter-title">
                <h2>Đăng ký nhận quà tặng</h2>
                Để lại email của bạn để nhận tin mới nhất kèm quà tặng.
              </div>
            </div>
            <div className="col-md-5 col-sm-7 xs-mt-20">
              <div className="newsletter-form">
                <form action="#" method="POST">
                  <input type="text" placeholder="Email của bạn..." />
                  <button type="submit">Đăng ký !</button>
                </form>
              </div>
            </div>
            <div className="col-md-3 col-sm-5 xs-mt-20">
              <div className="social-icons text-right">
                <a href="#" target="_blank">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#" target="_blank">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#" target="_blank">
                  <i className="fa fa-rss" />
                </a>
                <a href="#" target="_blank">
                  <i className="fa fa-youtube" />
                </a>
                <a href="#" target="_blank">
                  <i className="fa fa-google-plus" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-widget-area">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-6 xs-mt-40">
              <div className="widget-title">
                <h3>Địa chỉ liên lạc</h3>
              </div>
              <div className="widget-address">
                <p>
                  {" "}
                  <span> Địa chỉ: </span> Thanh Liệt, Thanh Trì, Hà Nội.
                </p>
                <p>
                  {" "}
                  <span> Số điện thoại: </span>{" "}
                  <a href="tel:880123456789">(800) 123 456 789</a>{" "}
                </p>
                <p>
                  {" "}
                  <span> Email: </span>{" "}
                  <a href="mailto:admin@admin.vn">admin@admin.vn</a>{" "}
                </p>
                <p>
                  {" "}
                  <span> Fax: </span> (800) 123 456 789
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 xs-mt-40">
              <div className="widget-title">
                <h3>Tài khoản</h3>
              </div>
              <div className="widget-menu">
                <a href="my-account.html">Đơn hàng của tôi</a>
                <a href="my-account.html">Tài khoản của tôi</a>
                <a href="my-account.html">Địa chỉ của tôi</a>
                <a href="my-account.html">Thông tin cá nhân của tôi</a>
                <a href="my-account.html">Danh sách yêu thích của tôi</a>
              </div>
            </div>
            <div className="col-md-2 col-sm-6 sm-mt-40 xs-mt-40">
              <div className="widget-title">
                <h3>Link hữu ích</h3>
              </div>
              <div className="widget-menu">
                <a href="index.html">Trang chủ</a>
                <a href="shop.html">Cửa hàng</a>
                <a href="blog-right-sidebar.html">Tin tức</a>
                {/* <a href="contact.html">Liên hệ</a> */}
              </div>
            </div>
            <div className="col-md-3 col-sm-6 sm-mt-40 xs-mt-40">
              <div className="widget-title">
                <h3>Facebook</h3>
              </div>
              <div className="widget-menu">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=267&height=214&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                  width={267}
                  height={214}
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder={0}
                  allowFullScreen="true"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="footer-bottom-area">
          <div className="text-center footer-copyright">
            Copyright © <a href="#">devitems</a>. Developed by{" "}
            <a href="http://alice.vn">Alice</a>. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
