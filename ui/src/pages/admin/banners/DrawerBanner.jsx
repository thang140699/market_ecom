import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Drawer, Form, Input, message, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useHistory } from "react-router-dom";
import { clearErrors, createBanner } from "../../../actions/bannerAction";
import { CREATE_BANNER_SUCCESS } from "../../../constants/bannerConstants";
const DrawerBanner = (props) => {
  const history = useHistory();
  const { onClose, open, setOpenDrawer, setRefreshTable, refreshTable } = props;
  const [form] = useForm();
  const { loading, error, success } = useSelector((state) => state.newBanner);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      message.success("Thêm thành công");
      setRefreshTable(!refreshTable);
      setOpenDrawer(false);
      form.resetFields();
      dispatch({ type: CREATE_BANNER_SUCCESS });
    }
  }, [dispatch, message, error, history, success, refreshTable]);
  const onFinish = (values) => {
    dispatch(createBanner(values));
    setRefreshTable(!refreshTable);
  };
  return (
    <div>
      {" "}
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Drawer
          title="Thêm thương hiệu mới"
          placement="right"
          width={720}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <Button onClick={onClose}>Hủy</Button>
              <Button onClick={() => form.submit()} type="primary">
                Thêm vào kho
              </Button>
            </Space>
          }
        >
          <Form
            layout="vertical"
            hideRequiredMark
            form={form}
            onFinish={onFinish}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="imageBanner"
                  label="Hình ảnh"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập hình ảnh",
                    },
                  ]}
                >
                  <Input placeholder="Nhập hình ảnh" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="titleMain"
                  label="Tiêu đề thứ nhất"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập hình ảnh",
                    },
                  ]}
                >
                  <Input placeholder="Nhập hình ảnh" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="titleDesc"
                  label="Tiêu đề thứ nhất"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tiêu đề",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tiêu đề" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="promotion"
                  label="Tiêu đề khuyến mãi"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tiêu đề khuyến mãi",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tiêu đề khuyến mãi" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="description"
                  label="Mô tả"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mô tả",
                    },
                  ]}
                >
                  <Input placeholder="Nhập mô tả" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </Drawer>
    </div>
  );
};

export default DrawerBanner;
