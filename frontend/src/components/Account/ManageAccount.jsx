import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Tabs } from "antd";
import ChangePassword from "./ChangePassword";
import UserInfo from "./UserInfo";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "info",
    label: "Cập nhật thông tin",
    children: <UserInfo />,
  },
  {
    key: "password",
    label: "Đổi mật khẩu",
    children: <ChangePassword />,
  },
];
function ManageAccount(props) {
  let { isModalOpen, handleCancel } = props;

  return (
    <>
      <Modal
        title="Quản lý người dùng"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        maskClosable={false}
        width={"60vw"}>
        <Tabs defaultActiveKey="info" items={items} onChange={onChange} />
      </Modal>
    </>
  );
}

export default ManageAccount;
