import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, message, Space, Table, Tag } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearErrors,
  deleteSupplier,
  getSupplier,
} from "../../../actions/supplierAction";
import { DELETE_SUPPLIER_RESET } from "../../../constants/supplierConstants";
import DrawerSupplier from "./DrawerSupplier";
const Supplier = () => {
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
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={(e) => deleteProductHandler(record._id)}
          />
        </Space>
      ),
    },
  ];
  const [refreshTable, setRefreshTable] = useState(false);
  const { error, supplier } = useSelector((state) => state.allSupplier);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.supplier
  );
  const deleteProductHandler = (id) => {
    dispatch(deleteSupplier(id));
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
      message.success("Xóa nhà phân phối thành công");
      setRefreshTable(!refreshTable);
      dispatch({ type: DELETE_SUPPLIER_RESET });
    }

    dispatch(getSupplier());
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
          dataSource={supplier}
          bordered
          key={refreshTable}
        />
      </Card>
      <DrawerSupplier
        open={openDrawer}
        onClose={onClose}
        setOpenDrawer={setOpenDrawer}
        setRefreshTable={setRefreshTable}
        refreshTable={refreshTable}
      />
    </div>
  );
};

export default Supplier;
