import { Space, Table, Tag } from "antd";
import { callHistoryOrder } from "../../services/api";
import { useEffect, useState } from "react";
import JSONView from "react-json-view";
const columns = [
  {
    title: "STT",
    dataIndex: "_id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Thời gian",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
  {
    title: "Tổng số tiền",
    dataIndex: "totalPrice",
    key: "totalPrice",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, record) => (
      <Tag color="green" key={record._id}>
        Thành công
      </Tag>
    ),
  },
  {
    title: "Chi tiết",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <JSONView collapsed enableClipboard={false} src={record.detail} />
      </Space>
    ),
  },
];

const History = () => {
  const [dataHistory, setDataHistory] = useState();

  console.log("check data history", dataHistory);
  useEffect(() => {
    const fetchHistoryOrder = async () => {
      let res = await callHistoryOrder();

      if (res && res.data) {
        setDataHistory(res.data);
      }
    };
    fetchHistoryOrder();
  }, []);
  return <Table columns={columns} dataSource={dataHistory} />;
};
export default History;
