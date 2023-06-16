import { Card, Input, Select, Space, Table, DatePicker } from "antd";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRevenue } from "../../../actions/orderAction";
import ExportExcelButton from "../../../components/Export/ExportExcelButton";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const monthFormat = "YYYY-MM";

const Statis = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState();
  const [date, setDate] = useState("");
  const [monAndDate, setMonth] = useState("");
  const [status, setStatus] = useState("Đã hoàn thành");
  const { orders } = useSelector((state) => state.allRevenue);
  const handleChangeMonth = (e) => {
    if (e) {
      setDate(format(e, "yyyy-MM"));
    } else {
      setDate("");
    }
  };
  console.log(date);
  const handleChangeStatus = (value) => {
    setStatus(value);
  };
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.itemsPrice;
    });
  useEffect(() => {
    dispatch(getAllRevenue(date, status));
  }, [dispatch, monAndDate, status, date]);
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "number",
      key: "number",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
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
  ];
  const dataSa = [];
  orders &&
    orders.forEach((item, i) => {
      // setPrice(item.price);
      dataSa.push({
        number: i + 1,
        id: item._id,
        itemsPrice: item.itemsPrice,
        dateFind: item.dateFind,
      });
    });
  return (
    <>
      {" "}
      <Card
        title={`Tổng doanh thu đơn hàng: ${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(totalAmount)} (${date}) - ${status}`}
        style={{ marginTop: 20 }}
        extra={
          <Space>
            <DatePicker
              format={monthFormat}
              picker="month"
              onChange={(e) => handleChangeMonth(e.$d)}
            />

            <Select
              defaultValue="Chọn trạng thái"
              onChange={handleChangeStatus}
              options={[
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

            <ExportExcelButton
              dataSource={dataSa}
              columns={columns}
              columnTitles={columns.map((column) => column.title)}
              filename={`Bảng chi tiết doanh thu với đơn hàng - ${status}`}
            />
          </Space>
        }
      >
        <Table columns={columns} dataSource={dataSa} />
      </Card>
    </>
  );
};

export default Statis;
