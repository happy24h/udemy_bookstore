import {
  Table,
  Row,
  Col,
  Tag,
  Button,
  Space,
  Popconfirm,
  message,
  notification,
} from "antd";
import {
  EditTwoTone,
  DeleteOutlined,
  EyeTwoTone,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";

import { useState, useEffect } from "react";
import { callListBook, callDeleteBook } from "../../../services/api";
import BookViewDetail from "./BookViewDetail";
import BookModalCreate from "./BookModalCreate";
import BookModalUpdate from "./BookModalUpdate";
// import UserImport from "./UserImport";
import * as XLSX from "xlsx";
import BookSearch from "./BookSearch";
function BookTable() {
  const [listUser, setListUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dataViewDetail, setDataViewDetail] = useState();
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();

  useEffect(() => {
    fetchBook();
    // handleSearch();
  }, [current, pageSize]);

  const fetchBook = async (searchFilter) => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (searchFilter) {
      query += `&${searchFilter}`;
    }
    const res = await callListBook(query);
    if (res && res.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <a
            href="#"
            onClick={() => {
              setDataViewDetail(record);
              setOpenViewDetail(true);
            }}>
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Tên sách",
      dataIndex: "mainText",
      sorter: (a, b) => a.mainText.localeCompare(b.mainText),
      render: (text) => <span style={{ color: "#1677ff" }}>{text}</span>,
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },

    {
      title: "Tác giả",
      dataIndex: "author",
      sorter: true,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      sorter: true,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      sorter: true,

      render: (text) => (
        <span style={{ color: "#1677ff" }}>
          {moment(text).format("DD-MM-YY HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            style={{ border: "1px solid #f57800" }}
            type="primary"
            ghost
            onClick={() => handleEditUser(record)}>
            <EditTwoTone twoToneColor="#f57800" style={{ cursor: "pointer" }} />
          </Button>
          <Popconfirm
            placement="leftTop"
            title={"Xác nhận xóa user"}
            description={"Bạn có chắc chắn muốn xóa user này ?"}
            onConfirm={() => handleDeleteBook(record._id)}
            okText="Xác nhận"
            cancelText="Hủy">
            <Button
              type="primary"
              danger
              ghost
              // onClick={() => handleDeleteUser(record)}
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleExportData = () => {
    if (listUser.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listUser);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "ExportUser.csv");
    }
  };
  const handleEditUser = (data) => {
    console.log("check data modal update", data);
    setOpenModalUpdate(true);
    setDataUpdate(data);
  };
  const handleDeleteBook = async (userId) => {
    const res = await callDeleteBook(userId);
    if (res && res.data) {
      message.success("Xóa sách thành công");
      fetchBook();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table List Users</span>
        <span style={{ display: "flex", gap: 15 }}>
          <Button type="primary" onClick={() => handleExportData()}>
            <ExportOutlined />
            Export
          </Button>
          <Button type="primary" onClick={() => setOpenModalImport(true)}>
            <ImportOutlined />
            Import
          </Button>
          <Button type="primary" onClick={() => setOpenModalCreate(true)}>
            <PlusOutlined />
            Thêm mới
          </Button>
        </span>
      </div>
    );
  };

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleSearch = (query) => {
    fetchBook(query);
  };

  return (
    <div style={{ margin: "0 20px" }}>
      <>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <BookSearch handleSearch={handleSearch} />
          </Col>
        </Row>
        <Table
          title={renderHeader}
          loading={isLoading}
          columns={columns}
          dataSource={listUser}
          onChange={onChange}
          rowKey={"_id"}
          pagination={{
            current: current,
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
      </>
      <BookModalCreate
        setOpenModalCreate={setOpenModalCreate}
        openModalCreate={openModalCreate}
        fetchBook={fetchBook}
      />
      <BookViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />

      {/* <UserImport
          setOpenModalImport={setOpenModalImport}
          openModalImport={openModalImport}
        /> */}
      <BookModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        fetchBook={fetchBook}
      />
    </div>
  );
}

export default BookTable;
