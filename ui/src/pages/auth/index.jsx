import { LoadingOutlined } from "@ant-design/icons";
import { Input, message as messageAntd, Modal } from "antd";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  forgotPassword,
  login,
  register,
} from "../../actions/userAction";
import "./auth.css";
const Login = ({ history, location }) => {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { message } = useSelector((state) => state.forgotPassword);
  const toggleForm = () => {
    const container = document.querySelector(".container");
    container.classList.toggle("active");
  };
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const { name, email, password, phone, address } = user;
  const [avatar, setAvatar] = useState(
    "https://png.pngtree.com/png-clipart/20190904/original/pngtree-hand-drawn-flat-wind-user-avatar-icon-png-image_4492039.jpg"
  );
  const [avatarPreview, setAvatarPreview] = useState(
    "https://png.pngtree.com/png-clipart/20190904/original/pngtree-hand-drawn-flat-wind-user-avatar-icon-png-image_4492039.jpg"
  );
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("phone", phone);
    myForm.set("address", address);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const { errorForgot, messageForgot, loadingForgot } = useSelector(
    (state) => state.forgotPassword
  );
  const [emailFogot, setEmailFogot] = useState("");
  const handleForgot = (e) => {
    e.preventDefault();
    const payload = {
      email: emailFogot,
    };
    dispatch(forgotPassword(payload));
  };
  useEffect(() => {
    if (error) {
      messageAntd.success(error);
      dispatch(clearErrors());
    }
    if (message) {
      messageAntd.success("Đăng nhập thành công");
    }
    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, message, history, isAuthenticated, redirect, message]);
  useEffect(() => {
    if (errorForgot) {
      messageAntd.error("Lỗi");
      dispatch(clearErrors());
    }

    if (messageForgot) {
      messageAntd.success("Đã gửi mã kích hoạt đến địa chỉ email");
      setOpen(false);
    }
  }, [dispatch, errorForgot, messageAntd, messageForgot]);
  return (
    <Fragment>
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <div className="loginUp">
          <section className="ssLog">
            <div className="container">
              <div className="user signinBx">
                <div className="imgBx">
                  <img
                    src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
                    alt=""
                  />
                </div>
                <div className="formBx">
                  <form action onsubmit="return false;" onSubmit={loginSubmit}>
                    <h2>Đăng nhập</h2>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <input
                      className="loginBtn"
                      type="submit"
                      name
                      defaultValue="Login"
                      value="Đăng nhập"
                    />
                    <p className="signup">
                      Bạn chưa có tài khoản?{""}
                      <a href="#" onClick={toggleForm}>
                        Đăng ký .
                      </a>
                    </p>
                    <p className="signup">
                      <a href="#" onClick={submitReviewToggle}>
                        Quên mật khẩu ?
                      </a>
                    </p>
                  </form>
                </div>
              </div>
              <div className="user signupBx">
                <div className="formBx">
                  <form
                    action
                    onsubmit="return false;"
                    onSubmit={registerSubmit}
                  >
                    <h2>Đăng ký tài khoản mới</h2>
                    <input
                      type="text"
                      placeholder="Nhập họ tên"
                      required
                      name="name"
                      value={name}
                      onChange={registerDataChange}
                    />
                    <input
                      type="email"
                      placeholder="Nhập địa chỉ email"
                      required
                      name="email"
                      value={email}
                      onChange={registerDataChange}
                    />
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu"
                      required
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                    />
                    <input
                      type="text"
                      placeholder="Nhập số điện thoại"
                      required
                      name="phone"
                      value={phone}
                      onChange={registerDataChange}
                    />
                    <input
                      type="address"
                      placeholder="Nhập địa chỉ"
                      required
                      name="address"
                      value={address}
                      onChange={registerDataChange}
                    />
                    <div id="registerImage">
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="imgChange"
                      />
                      <input
                        wrapperClass="mb-4"
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                      />
                    </div>
                    <input
                      type="submit"
                      name
                      defaultValue="Sign Up"
                      value="Đăng ký"
                    />
                    <p className="signup">
                      Bạn đã có tài khoản ?
                      <a href="#" onClick={toggleForm}>
                        Đăng nhập.
                      </a>
                    </p>
                  </form>
                </div>
                <div className="imgBx">
                  <img
                    src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      <Modal
        title="Lấy lại mật khẩu"
        open={open}
        onOk={handleForgot}
        onCancel={submitReviewToggle}
      >
        <Fragment>
          {loadingForgot ? (
            <div className="loading">
              <LoadingOutlined />
            </div>
          ) : (
            <Input
              placeholder="Nhập email"
              onChange={(e) => setEmailFogot(e.target.value)}
            />
          )}
        </Fragment>
      </Modal>
    </Fragment>
  );
};

export default Login;
