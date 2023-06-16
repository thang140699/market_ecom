import { Input, message, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearErrors,
  updateProfile,
  loadUser,
  updatePassword,
} from "../../../actions/userAction";
import {
  UPDATE_PASSWORD_RESET,
  UPDATE_PROFILE_RESET,
} from "../../../constants/userConstants";
import { Button, Modal } from "antd";
import { EyeTwoTone } from "@ant-design/icons";
import { EyeInvisibleOutlined } from "@ant-design/icons/lib/icons";
const Info = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading, isAuthenticated } = useSelector(
    (state) => state.profile
  );
  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(user.avatar);
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
      setAvatar(user.avatar);
    }
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      message.success("Chỉnh sửa thành công");
      dispatch(loadUser());

      history.push("/whitelist");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, message, history, user, isUpdated]);
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: name,
      phone: phone,
      address: address,
      email: email,
      avatar: avatar,
    };
    dispatch(updateProfile(payload));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    const payload = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    dispatch(updatePassword(payload));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="panel panel-default">
      <div className="panel-heading" role="tab" id="headingFour">
        <h4 className="panel-title">
          <a
            className="collapsed"
            role="button"
            data-toggle="collapse"
            data-parent="#accordion"
            href="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
            <i className="fa fa-user" />
            Thông tin cá nhân
          </a>
        </h4>
      </div>
      <div
        id="collapseFour"
        className="panel-collapse collapse"
        role="tabpanel"
        aria-labelledby="headingFour"
      >
        <div className="panel-body">
          <div className="col-md-12">
            <div className="delivery-info">
              <p>
                Khách hàng: <span>{user.name}</span>
              </p>
              <p>
                Địa chỉ: <span>{user.address}</span>
              </p>
              <p>
                Số điện thoại: <span>{user.phone}</span>
              </p>
              <p>
                Email: <span>{user.email}</span>
              </p>
            </div>
            <div className="panel panel-default" id="sacc">
              <div className="panel-heading" role="tab" id="edit">
                <h4 className="panel-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    data-parent="#sacc"
                    href="#edit-info"
                    aria-expanded="false"
                    aria-controls="edit-info"
                  >
                    <i className="fa fa-pencil" />
                    Sửa
                  </a>
                </h4>
              </div>
              <div
                id="edit-info"
                className="panel-collapse collapse"
                role="tabpanel"
                aria-labelledby="headingFour"
              >
                <div className="panel-body">
                  <div className="delivery-details">
                    <form action="#" onSubmit={onSubmit}>
                      <div className="list-style">
                        <div className="account-title">
                          <h4>
                            Hãy cập nhật thông tin cá nhân của bạn khi có thay
                            đổi{" "}
                          </h4>
                        </div>
                        <div className="form-name">
                          <label>
                            Họ và tên <em>*</em>{" "}
                          </label>
                          <input
                            type="text"
                            placeholder="Họ và tên"
                            required="required"
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="form-name">
                          <p>
                            Địa chỉ này sẽ trở thành địa chỉ mặc định khi bạn
                            mua hàng. Bạn cũng có thể thay đổi địa chỉ khác để
                            tiện cho việc gửi quà hoặc nhận đơn hàng tại địa chỉ
                            khác.
                          </p>
                          <label>
                            Địa chỉ của bạn<em>*</em>{" "}
                          </label>
                          <input
                            type="text"
                            placeholder="Địa chỉ của bạn..."
                            required="required"
                            defaultValue={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                        <div className="form-name">
                          <label>
                            Số điện thoại <em>*</em>{" "}
                          </label>
                          <input
                            type="tel"
                            placeholder="Số điện thoại"
                            required="required"
                            defaultValue={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <div className="form-name">
                          <label>
                            Email <em>*</em>{" "}
                          </label>
                          <input
                            type="email"
                            placeholder="Email"
                            required="required"
                            defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="save-button">
                          <button>Lưu thông tin</button>
                        </div>
                        <div className="save-button">
                          <button onClick={showModal}>Đổi mật khẩu</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Đổi mật khẩu"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical">
          <Input.Password
            placeholder="Nhập mật khẩu cũ"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input.Password
            placeholder="Nhập mật khẩu mới"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input.Password
            placeholder="Nhập lại mật khẩu mới"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Space>
      </Modal>
    </div>
  );
};

export default Info;
