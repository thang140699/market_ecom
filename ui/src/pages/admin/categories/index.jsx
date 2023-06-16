import React, { useEffect, useState } from "react";
import { Button, Card, message, Space, Table, Tag } from "antd";
import DrawerCategory from "./DrawerCategory";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteCategories,
  getCategories,
} from "../../../actions/categoriesAction";
import { DeleteOutlined } from "@ant-design/icons";
import { DELETE_CATEGORIES_RESET } from "../../../constants/categoriesConstants";
const Categories = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} alt="" style={{ height: 120 }} />,
      width: "15%",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
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
  const { error, categories } = useSelector((state) => state.allCategories);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.categories
  );
  console.log(categories);
  const deleteProductHandler = (id) => {
    dispatch(deleteCategories(id));
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
      message.success("Xóa danh mục thành công");
      setRefreshTable(!refreshTable);
      dispatch({ type: DELETE_CATEGORIES_RESET });
    }

    dispatch(getCategories());
  }, [dispatch, message, error, deleteError, history, isDeleted, refreshTable]);
  return (
    <div>
      <Card
        title="Danh sách danh mục"
        bordered={false}
        extra={
          <Button type="primary" onClick={showDrawer}>
            Thêm mới
          </Button>
        }
      >
        <Table columns={columns} dataSource={categories} bordered />;
      </Card>
      <DrawerCategory
        open={openDrawer}
        onClose={onClose}
        setOpenDrawer={setOpenDrawer}
        setRefreshTable={setRefreshTable}
        refreshTable={refreshTable}
      />
    </div>
  );
};

export default Categories;
