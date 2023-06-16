import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import {
  AlignCenterOutlined,
  DashboardOutlined,
  DeliveredProcedureOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  PicCenterOutlined,
  PictureOutlined,
  UploadOutlined,
  UserOutlined,
  MailOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import { RiBillLine } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
// import "antd/dist/reset.css";
const { Header, Sider, Content } = Layout;

const AdminLayout = (props) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      route: "/admin/dashboard",
    },
    {
      key: "2",
      icon: <OrderedListOutlined />,
      label: "Quản lý sản phẩm",
      route: "/admin/products",
    },
    {
      key: "3",
      icon: <DeliveredProcedureOutlined />,
      label: "Đơn vị phân phối",
      route: "/admin/supplier",
    },
    {
      key: "6",
      icon: <PicCenterOutlined />,
      label: "Thương hiệu",
      route: "/admin/brands",
    },
    {
      key: "7",
      icon: <PictureOutlined />,
      label: "Banner",
      route: "/admin/banners",
    },
    {
      key: "8",
      icon: <WindowsOutlined />,
      label: "Danh mục sản phẩm",
      route: "/admin/categories",
    },
    {
      key: "9",
      icon: <AlignCenterOutlined />,
      label: "Chỉnh sửa menu",
      route: "/admin/sidebar",
    },

    {
      key: "4",
      icon: <RiBillLine />,
      label: "Quản lý đơn hàng",
      route: "/admin/orders",
    },
    {
      key: "5",
      icon: <UserOutlined />,
      label: "Quản lý tài khoản",
      route: "/admin/users",
    },
    {
      key: "10",
      icon: <MailOutlined />,
      label: "Góp ý",
      route: "/admin/feedbacks",
    },
  ];
  const backHomePage = () => {
    history.push("/products");
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.route}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Button onClick={backHomePage}> Quay lại trang chủ</Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 817,
            background: colorBgContainer,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
  // <div>{props.children}</div>;
};

export default AdminLayout;
