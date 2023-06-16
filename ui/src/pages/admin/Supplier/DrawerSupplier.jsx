import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Drawer, Form, Input, message, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useHistory } from "react-router-dom";
import { clearErrors, createSupplier } from "../../../actions/supplierAction";
import { CREATE_SUPPLIER_SUCCESS } from "../../../constants/supplierConstants";
const DrawerSupplier = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { onClose, open, setOpenDrawer, setRefreshTable, refreshTable } = props;
  const [form] = useForm();
  const { loading, error, success } = useSelector((state) => state.newSupplier);
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      message.success("Thêm nhà phân phối thành công");
      setRefreshTable(!refreshTable);
      setOpenDrawer(false);
      form.resetFields();
      dispatch({ type: CREATE_SUPPLIER_SUCCESS });
    }
  }, [dispatch, message, error, history, success, refreshTable]);
  const onFinish = (values) => {
    dispatch(createSupplier(values));
    setRefreshTable(!refreshTable);
  };
  return (
    <div>
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
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên thương hiệu"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên thương hiệu",
                  },
                ]}
              >
                <Input placeholder="Nhập tên thương hiệu" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ",
                  },
                ]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default DrawerSupplier;
