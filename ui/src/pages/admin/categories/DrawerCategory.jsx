import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Drawer, Form, Input, message, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useHistory } from "react-router-dom";
import {
  clearErrors,
  createCategories,
} from "../../../actions/categoriesAction";
import { CREATE_CATEGORIES_SUCCESS } from "../../../constants/categoriesConstants";
const DrawerCategory = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = useForm();
  const { loading, error, success } = useSelector(
    (state) => state.newCategories
  );
  const { onClose, open, setOpenDrawer, setRefreshTable, refreshTable } = props;
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      message.success("Thêm danh mục thành công");
      setRefreshTable(!refreshTable);
      setOpenDrawer(false);
      form.resetFields();
      dispatch({ type: CREATE_CATEGORIES_SUCCESS });
    }
  }, [dispatch, message, error, history, success, refreshTable]);
  const onFinish = (values) => {
    dispatch(createCategories(values));
    setRefreshTable(!refreshTable);
  };
  return (
    <div>
      {" "}
      <Drawer
        title="Thêm danh mục mới mới"
        placement="right"
        onClose={onClose}
        width={500}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Hủy</Button>
            <Button onClick={() => form.submit()} type="primary">
              Thêm
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
                name="name"
                label="Danh mục"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập danh mục",
                  },
                ]}
              >
                <Input placeholder="Nhập danh mục" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="image"
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
        </Form>
      </Drawer>
    </div>
  );
};

export default DrawerCategory;
