import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
  updateOrder,
} from "../../../actions/orderAction";
import { format } from "date-fns";
import {
  Card,
  Col,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import {
  DELETE_ORDER_RESET,
  UPDATE_ORDER_RESET,
} from "../../../constants/orderConstants";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const AdminOrdersPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { error, orders } = useSelector((state) => state.allOrders);
  const {
    error: deleteError,
    isDeleted,
    isUpdated,
  } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };
  const [statusOn, setStatusOn] = useState("");
  const handleChange = (value) => {
    setStatusOn(value);
  };
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState("");
  const [monAndDate, setMonth] = useState("");
  const [status, setStatus] = useState();
  const [number, setNumber] = useState();
  const handleChangeStatus = (value) => {
    setStatus(value);
  };
  useEffect(() => {
    setDate(format(startDate, "yyyy-MM-dd"));
  });
  const dateFind = date;

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      message.error(deleteError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      message.success("Thay đổi trạng thái thành công");
      history.push("/admin/orders");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    if (isDeleted) {
      message.success("Xóa thành công");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders(monAndDate, status, number));
  }, [
    dispatch,
    message,
    error,
    deleteError,
    history,
    isUpdated,
    isDeleted,
    dateFind,
    status,
    number,
    monAndDate,
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState();
  const showModal = (values) => {
    setData(values);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    if (statusOn !== "") {
      const payload = {
        status: statusOn,
      };
      dispatch(updateOrder(data._id, payload));

      setIsModalOpen(false);
    }
    history.push("/admin/orders");
  };
  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số điện thoại",
      dataIndex: ["shippingInfo", "phoneNo"],
      key: "userNumber",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số lượng",
      dataIndex: "orderItems",
      key: "orderItems",
      render: (orderItems) => <span>{orderItems.length}</span>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "itemsPrice",
      key: "itemsPrice",
      render: (itemsPrice) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(itemsPrice)}
        </span>
      ),
    },
    {
      title: "Ngày mua",
      dataIndex: "dateFind",
      key: "dateFind",
    },
    {
      title: "Trạng thái",
      key: "orderStatus",
      dataIndex: "orderStatus",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined onClick={(e) => showModal(record)} />
          {/* <DeleteOutlined
            style={{ color: "red" }}
            onClick={(e) => deleteOrderHandler(record._id)}
          /> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title="Danh sách đơn hàng"
        bordered={false}
        extra={
          <Space>
            <Input
              placeholder="Tìm kiếm theo ngày"
              onChange={(e) => setMonth(e.target.value)}
            />
            <Input
              placeholder="Tìm kiếm theo số điện thoại"
              onChange={(e) => setNumber(e.target.value)}
            />
            <Select
              defaultValue="Chọn trạng thái"
              onChange={handleChangeStatus}
              options={[
                {
                  value: "Đang giao",
                  label: "Đang giao",
                },
                {
                  value: "Đang xử lý",
                  label: "Đang xử lý",
                },
                {
                  value: "Đã hoàn thành",
                  label: "Đã hoàn thành",
                },
              ]}
            />
          </Space>
        }
      >
        <Table columns={columns} dataSource={orders} />;
      </Card>
      {data && (
        <Modal
          title={`Chi tiết đơn - ${data._id}`}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Row>
            <Col span={12}>
              <p>Tên người nhận: {data.userName}</p>
              <p>
                Địa chỉ:{" "}
                {data.shippingInfo.address +
                  ", " +
                  data.shippingInfo.city +
                  ", " +
                  data.shippingInfo.country}
              </p>
              <p>Số điện thoại: {data.shippingInfo.phoneNo}</p>
              <p>Ghi chú: {data.note}</p>
            </Col>
            <Col span={12}>
              <p>Phí ship: {data.shippingPrice}</p>
              <p>
                Tổng tiền:
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(data.itemsPrice)}{" "}
                ({" "}
                {data.paymentInfo.status === "succeeded" ? (
                  <span style={{ color: "green" }}>Đã thanh toán</span>
                ) : (
                  <span style={{ color: "red" }}>Chưa thanh toán</span>
                )}
                )
              </p>
              <p>Tên người nhận: {data.userName}</p>
              {/* <p>Trạng thái đơn: {data.orderStatus}</p> */}
              <p>
                Trạng thái đơn:{" "}
                <Select
                  defaultValue={data.orderStatus}
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={[
                    data.orderStatus === "Đang xử lý"
                      ? {
                          value: "Đang giao",
                          label: "Đang giao ",
                        }
                      : {
                          value: "Đã hoàn thành",
                          label: "Đã hoàn thành",
                        },
                  ]}
                />
              </p>
            </Col>
          </Row>
        </Modal>
      )}
    </>
  );
};

export default AdminOrdersPage;
