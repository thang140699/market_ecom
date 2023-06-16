import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Table, Tag, Space, message, Button, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstants";
import { formatCurrency } from "../../../utils/helper";
import DrawerProduct from "./DrawerProduct";
import { getBrand } from "../../../actions/brandAction";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error, products } = useSelector((state) => state.products);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [typeDrawer, setTypeDrawer] = useState("");
  const [id, setId] = useState();
  const [proData, setPrData] = useState();
  const [keyword, setKeyword] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  const onChangeSelect = (value) => {
    setBrandSearch(value);
  };
  const showDrawer = () => {
    setTypeDrawer("create");
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  const showDrawerUpdate = (values) => {
    setId(values._id);
    setPrData(values);
    setTypeDrawer("update");
    setOpenDrawer(true);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "Tên sản phẩm",
      width: "15%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: "10%",
      key: "price",
      align: "center",
      render: (price) => <span>{formatCurrency(`${price}`) + " đ"}</span>,
    },
    {
      title: "Khuyến mãi",
      dataIndex: "promotion",
      key: "promotion",
      width: "7%",
      align: "center",
    },
    {
      title: "Giá nhập hàng",
      dataIndex: "importPrice",
      key: "importPrice",
      width: "10%",
      align: "center",
      render: (importPrice) => (
        <span>{formatCurrency(`${importPrice}`) + " đ"}</span>
      ),
    },
    {
      title: "Số hàng trong kho",
      dataIndex: "Stock",
      key: "stock",
      width: "10%",
      align: "center",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Nhà phân phối",
      dataIndex: "supplier",
      key: "supplier",
      align: "center",
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      key: "brand",
      align: "center",
    },
    {
      title: "Ngày nhập",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (importPrice) => {
        const date = new Date(importPrice);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined onClick={(e) => showDrawerUpdate(record)} />
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={(e) => deleteProductHandler(record._id)}
          />
        </Space>
      ),
    },
  ];
  const [refreshTable, setRefreshTable] = useState(false);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      message.success("Xóa sách thành công");
      setRefreshTable(!refreshTable);
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct(keyword, brandSearch));
  }, [
    dispatch,
    message,
    error,
    deleteError,
    history,
    isDeleted,
    refreshTable,
    keyword,
    brandSearch,
  ]);
  const { brand } = useSelector((state) => state.allBrand);
  const brands = [{ value: "", label: "Tất cả" }];
  brand &&
    brand.forEach((item, i) => {
      brands.push({
        value: item.name,
        label: item.name,
      });
    });
  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);
  const data = [];
  products &&
    products.forEach((item, i) => {
      // setPrice(item.price);
      data.push({
        _id: item._id,
        number: i + 1,
        name: item.name,
        price: item.price,
        promotion: item.promotion,
        importPrice: item.importPrice,
        Stock: item.Stock,
        category: item.category,
        supplier: item.supplier,
        brand: item.brand,
        createdAt: item.createdAt,
      });
    });
  return (
    <div>
      <Card
        title="Quản lý sản phẩm"
        bordered={false}
        extra={
          <Space>
            <Select
              showSearch
              placeholder="Tìm kiếm theo thương hiệu"
              optionFilterProp="children"
              onChange={onChangeSelect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={brands}
            />
            <Input
              placeholder="Tìm kiếm theo tên "
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button type="primary" onClick={showDrawer}>
              Thêm mới
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={data}
          bordered
          key={refreshTable}
        />
      </Card>
      {typeDrawer === "create" ? (
        <DrawerProduct
          open={openDrawer}
          onClose={onClose}
          typeDrawer="create"
          setOpenDrawer={setOpenDrawer}
          setRefreshTable={setRefreshTable}
          refreshTable={refreshTable}
        />
      ) : (
        <DrawerProduct
          open={openDrawer}
          onClose={onClose}
          typeDrawer="update"
          setOpenDrawer={setOpenDrawer}
          setRefreshTable={setRefreshTable}
          refreshTable={refreshTable}
          id={id}
          proData={proData}
        />
      )}
    </div>
  );
};

export default AdminProducts;
