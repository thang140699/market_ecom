import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, message, Space, Table, Tag } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearErrors,
  deleteBrand,
  getBrand,
} from "../../../actions/brandAction";
import { DELETE_BRAND_RESET } from "../../../constants/brandConstants";
import DrawerBrand from "./DrawerBrand";

const Brand = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined />
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={(e) => deleteProductHandler(record._id)}
          />
        </Space>
      ),
    },
  ];
  const [refreshTable, setRefreshTable] = useState(false);
  const { error, brand } = useSelector((state) => state.allBrand);
  const { error: deleteError, isDeleted } = useSelector((state) => state.brand);
  const deleteProductHandler = (id) => {
    dispatch(deleteBrand(id));
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
      message.success("Xóa thương hiệu thành công");
      setRefreshTable(!refreshTable);
      dispatch({ type: DELETE_BRAND_RESET });
    }

    dispatch(getBrand());
  }, [dispatch, message, error, deleteError, history, isDeleted, refreshTable]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  return (
    <div>
      <Card
        title="Danh sách thương hiệu "
        bordered={false}
        extra={
          <Button type="primary" onClick={showDrawer}>
            Thêm mới
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={brand}
          bordered
          key={refreshTable}
        />
      </Card>
      <DrawerBrand
        open={openDrawer}
        onClose={onClose}
        setOpenDrawer={setOpenDrawer}
        setRefreshTable={setRefreshTable}
        refreshTable={refreshTable}
      />
    </div>
  );
};

export default Brand;
