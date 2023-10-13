import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Modal,
  notification,
  Form,
  Input,
  message,
} from "antd";
import { callUpdateUser } from "../../../services/api";
function UserModalUpdate(props) {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { fullName, _id, phone, avatar } = values;
    setIsSubmit(true);
    const res = await callUpdateUser(_id, fullName, phone, avatar);
    console.log("check res", res);
    if (res && res.data) {
      message.success("Cập nhật người dùng thành công");
      await props.fetchUser();
      setOpenModalUpdate(false);
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  return (
    <>
      <Modal
        title="Cập nhật người dùng"
        open={openModalUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalUpdate(false);
          setDataUpdate();
        }}
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
            hidden
            labelCol={{ span: 24 }} //whole column
            label="Id"
            name="_id"
            rules={[{ required: true, message: "Vui lòng nhập Id!" }]}>
            <Input />
          </Form.Item>
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
            <Input disabled />
          </Form.Item>

          {/* <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Mật khẩu không được để trống!" },
            ]}>
            <Input.Password />
          </Form.Item> */}
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
            labelCol={{ span: 24 }} //whole column
            label="Hình ảnh"
            name="avatar"
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

export default UserModalUpdate;
