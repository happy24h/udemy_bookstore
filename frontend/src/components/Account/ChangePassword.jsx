import { callUpdatePassword } from "../../services/api";
import { message, notification, Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function ChangePassword() {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const user = useSelector((state) => state.account.user);
  const onFinish = async (values) => {
    const { email, oldpass, newpass } = values;
    setIsSubmit(true);
    const res = await callUpdatePassword(email, oldpass, newpass);
    if (res && res.data) {
      message.success("Cập nhật mật khẩu thành công");
      form.setFieldValue("oldpass", "");
      form.setFieldValue("newpass", "");
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user.id]);

  return (
    <div>
      {" "}
      <Form
        form={form}
        name="basic"
        style={{ maxWidth: 600, margin: "0 auto" }}
        onFinish={onFinish}
        autoComplete="off">
        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email không được để trống!" }]}>
          <Input disabled />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Mật khẩu"
          name="oldpass"
          rules={[
            { required: true, message: "Mật khẩu không được để trống!" },
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Mật khẩu"
          name="newpass"
          rules={[
            { required: true, message: "Mật khẩu không được để trống!" },
          ]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Xác nhận
        </Button>
      </Form>
    </div>
  );
}

export default ChangePassword;
