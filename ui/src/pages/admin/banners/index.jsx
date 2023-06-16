import React, { useEffect, useState } from "react";
import { Button, Card, message, Space, Table, Tag } from "antd";
import DrawerBanner from "./DrawerBanner";
import {
  clearErrors,
  deleteBanner,
  getBanner,
} from "../../../actions/bannerAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { DELETE_BANNER_RESET } from "../../../constants/bannerConstants";
const Banners = () => {
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
      dataIndex: "imageBanner",
      key: "imageBanner",
      render: (text) => <img src={text} alt="" style={{ height: 120 }} />,
      width: "15%",
    },
    {
      title: "Tiêu đề 1",
      dataIndex: "titleMain",
      key: "titleMain",
    },
    {
      title: "Tiêu đề phụ",
      dataIndex: "titleDesc",
      key: "titleDesc",
    },
    {
      title: "Tiêu đề khuyến mãi",
      dataIndex: "promotion",
      key: "promotion",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
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
  const { error, banner } = useSelector((state) => state.allBanner);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.banner
  );
  const deleteProductHandler = (id) => {
    dispatch(deleteBanner(id));
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
      dispatch({ type: DELETE_BANNER_RESET });
    }

    dispatch(getBanner());
  }, [dispatch, message, error, deleteError, history, isDeleted, refreshTable]);

  return (
    <div>
      {" "}
      <Card
        title="Danh sách banner"
        bordered={false}
        extra={
          <Button type="primary" onClick={showDrawer}>
            Thêm mới
          </Button>
        }
      >
        <Table columns={columns} dataSource={banner} bordered />;
      </Card>
      <DrawerBanner
        open={openDrawer}
        onClose={onClose}
        setOpenDrawer={setOpenDrawer}
        setRefreshTable={setRefreshTable}
        refreshTable={refreshTable}
      />
    </div>
  );
};

export default Banners;
