import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, Select, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../../actions/productAction";
import { getAllOrders } from "../../../actions/orderAction";
import { getAllUsers } from "../../../actions/userAction";
import { format } from "date-fns";
import { getAdminStatistical } from "../../../actions/statisticalAction";
import Statis from "./Statis";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const { statisticals } = useSelector((state) => state.statisticals);

  useEffect(() => {
    dispatch(getAdminStatistical());
  }, [dispatch]);
  let totalBudget = 0;
  statisticals &&
    statisticals.forEach((item) => {
      totalBudget += item.budget;
    });
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.itemsPrice;
    });
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Số lượng tài khoản" bordered>
            {users && users.length}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Tổng đơn hàng" bordered>
            {orders && orders.length}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Tổng sản phẩm" bordered>
            {products && products.length}
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Card title="Tổng doanh thu" bordered>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(totalAmount)}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Tiền vốn" bordered>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(totalBudget)}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Lợi nhuận" bordered>
            {totalBudget > 0
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalAmount - totalBudget)
              : new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalAmount + totalBudget)}
          </Card>
        </Col>
      </Row>
      <Statis />
    </>
  );
};

export default Dashboard;
