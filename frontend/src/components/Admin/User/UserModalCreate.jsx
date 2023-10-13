import React, { useState } from "react";
import {
  Button,
  Divider,
  Modal,
  notification,
  Form,
  Input,
  message,
} from "antd";
import { callCreateAUser } from "../../../services/api";
function UserModalCreate(props) {
  const { openModalCreate, setOpenModalCreate } = props;
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { fullName, password, email, phone } = values;
    setIsSubmit(true);
    const res = await callCreateAUser(fullName, email, password, phone);
    console.log("check res", res);
    if (res && res.data) {
      message.success("Tạo mới user thành công");
      form.resetFields(); // clear data khi submit
      setOpenModalCreate(false);
      await props.fetchUser();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  return (
    <>
      <Modal
        title="Thêm mới người dùng"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setOpenModalCreate(false)}
        okText={"Tạo mới"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}>
        <Divider />
        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Họ tên"
            name="fullName"
            rules={[
              { required: true, message: "Họ tên không được để trống!" },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email không được để trống!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Mật khẩu không được để trống!" },
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Số điện thoại không được để trống!" },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
          // wrapperCol={{ offset: 6, span: 16 }}
          ></Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UserModalCreate;
