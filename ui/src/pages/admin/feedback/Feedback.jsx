import { Card, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getFeedback } from "../../../actions/feedbackAction";
const Feedback = () => {
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Tên người gửi",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];
  const [refreshTable, setRefreshTable] = useState(false);
  const { error, allFeedback } = useSelector((state) => state.allSupplier);
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    dispatch(getFeedback());
  }, [dispatch, message, error, refreshTable]);
  return (
    <div>
      {" "}
      <Card title="Danh sách góp ý " bordered={false}>
        <Table
          columns={columns}
          dataSource={allFeedback}
          bordered
          key={refreshTable}
        />
      </Card>
    </div>
  );
};

export default Feedback;
