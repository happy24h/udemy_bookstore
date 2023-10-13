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

import { useState, useEffect } from "react";
import InputSearch from "./InputSearch";
import { callFetchListUser, callDeleteUser } from "../../../services/api";
import UserViewDetail from "./UserViewDetail";
import UserModalCreate from "./UserModalCreate";
import UserModalUpdate from "./UserModalUpdate";
import UserImport from "./UserImport";
import * as XLSX from "xlsx";

function UserTable() {
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
    fetchUser();
    // handleSearch();
  }, [current, pageSize]);

  const fetchUser = async (searchFilter) => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (searchFilter) {
      query += `&${searchFilter}`;
    }
    const res = await callFetchListUser(query);
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
      title: "Full Name",
      dataIndex: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      render: (text) => <span style={{ color: "#1677ff" }}>{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },

    {
      title: "Phone",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text) => {
        if (text === "ADMIN") {
          return <Tag color="blue">{text}</Tag>;
        } else {
          return <Tag color="green">{text}</Tag>;
        }
      },
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
            onConfirm={() => handleDeleteUser(record._id)}
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
  const handleDeleteUser = async (userId) => {
    const res = await callDeleteUser(userId);
    if (res && res.data) {
      message.success("Xóa user thành công");
      fetchUser();
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
    fetchUser(query);
  };

  return (
    <div style={{ margin: "0 20px" }}>
      <>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <InputSearch handleSearch={handleSearch} />
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
      <UserViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
      <UserModalCreate
        setOpenModalCreate={setOpenModalCreate}
        openModalCreate={openModalCreate}
        fetchUser={fetchUser}
      />
      <UserImport
        setOpenModalImport={setOpenModalImport}
        openModalImport={openModalImport}
      />
      <UserModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        fetchUser={fetchUser}
      />
    </div>
  );
}

export default UserTable;
