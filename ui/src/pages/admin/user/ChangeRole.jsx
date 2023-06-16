import { message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateUser } from "../../../actions/userAction";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";

const ChangeRole = (props) => {
  const { setIsModalOpen, isModalOpen, data, setRefreshTable, refreshTable } =
    props;
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      message.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      message.success("Chỉnh sửa tài khoản thành công");
      setRefreshTable(!refreshTable);
      setIsModalOpen(false);
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, message, isUpdated, updateError, user]);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [roleUpdate, setRoleUpdate] = useState(data && data?.role);

  const handleChange = (value) => {
    setRoleUpdate(value);
  };
  const handleOk = () => {
    const payload = {
      name: data.name,
      email: data.email,
      role: roleUpdate,
    };
    console.log(payload);
    dispatch(updateUser(data._id, payload));
    setRefreshTable(!refreshTable);
  };
  return (
    <div>
      <Modal
        title="Thay đổi quyền"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          defaultValue={data && data?.role}
          style={{
            width: 450,
          }}
          onChange={handleChange}
          options={[
            {
              value: "admin",
              label: "Quản trị viên",
            },
            {
              value: "user",
              label: "Người dùng",
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default ChangeRole;
