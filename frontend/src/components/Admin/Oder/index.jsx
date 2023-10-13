import { Space, Table, Tag } from "antd";
import { callListOrder } from "../../../services/api";
import { useEffect, useState } from "react";
import moment from "moment";
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";
const columns = [
  {
    title: "Id",
    dataIndex: "_id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tổng tiền",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (text) => (
      <span>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(text ?? 0)}
      </span>
    ),
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text) => <span>{moment(text).format(FORMAT_DATE_DISPLAY)}</span>,
  },
];
const ManageOder = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [dataOder, setDataOder] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchApiOrder = async () => {
      let listQuery = `current=${page}&pageSize=${pageSize}`;
      const res = await callListOrder(listQuery);
      console.log("check res", res);
      if (res && res.data) {
        setDataOder(res.data.result);
        setTotal(res.data.meta.total);
      }
    };
    fetchApiOrder();
  }, [page, pageSize]);
  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== page) {
      setPage(pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setPage(1);
    }
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div style={{ margin: "20px" }}>
      <Table
        columns={columns}
        dataSource={dataOder}
        onChange={onChange}
        pagination={{
          current: page,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
      />
    </div>
  );
};
export default ManageOder;
