import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, message, Space, Table, Tag } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from "../../../actions/userAction";
import { DELETE_USER_RESET } from "../../../constants/userConstants";
import ChangeRole from "./ChangeRole";
const User = () => {
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined onClick={(e) => showModal(record)} />
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={(e) => deleteProductHandler(record._id)}
          />
        </Space>
      ),
    },
  ];
  const [refreshTable, setRefreshTable] = useState(false);
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);
  const deleteProductHandler = (id) => {
    dispatch(deleteUser(id));
    setRefreshTable(!refreshTable);
  };
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      message.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      message.success("Xóa thành công");
      setRefreshTable(!refreshTable);
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, message, error, deleteError, isDeleted, refreshTable]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState();
  const showModal = (values) => {
    setData(values);
    setIsModalOpen(true);
  };

  return (
    <div>
      {" "}
      <Card title="Danh sách người dùng " bordered={false}>
        <Table
          columns={columns}
          dataSource={users}
          bordered
          key={refreshTable}
        />
      </Card>
      <ChangeRole
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={data}
        setRefreshTable={setRefreshTable}
        refreshTable={refreshTable}
      />
    </div>
  );
};

export default User;
