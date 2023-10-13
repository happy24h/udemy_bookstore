import {
  Tabs,
  Row,
  Col,
  Avatar,
  Upload,
  notification,
  message,
  Form,
  Button,
  Input,
} from "antd";
import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  doUploadAvatarAction,
  doUpdateUserInfoAction,
} from "../../redux/account/accountSlice";
import { callUpdateAvatar, callUpdateUserInfo } from "../../services/api";

function UserInfo() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const [userAvatar, setUserAvatar] = useState(user?.avatar ?? "");
  const [isSubmit, setIsSubmit] = useState(false);

  console.log(" user avatar", userAvatar);

  console.log("check user upload avatar", user.avatar);

  let tempAvatar = userAvatar;

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    tempAvatar || user?.avatar
  }`;
  const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
    const res = await callUpdateAvatar(file);
    if (res && res.data) {
      const newAvatar = res.data.fileUploaded;
      dispatch(doUploadAvatarAction({ avatar: newAvatar }));
      setUserAvatar(newAvatar);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file");
    }
  };

  const propsUpload = {
    maxCount: 1,
    multiple: false,
    showUploadList: false,
    customRequest: handleUploadAvatar,
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "drone") {
        message.success("Upload file thành công");
      } else if (info.file.status === "error") {
        message.error("upload file thất bại");
      }
    },
  };
  const onFinish = async (values) => {
    const { fullName, phone, id } = values;
    setIsSubmit(true);
    const res = await callUpdateUserInfo(id, phone, fullName, userAvatar);
    if (res && res.data) {
      dispatch(doUpdateUserInfoAction({ avatar: userAvatar, phone, fullName }));
      message.success("Cập nhật thông tin user thành công");

      // force renew token
      localStorage.removeItem("access_token");
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user.id]);
  return (
    <div>
      <Row
        sm={24}
        md={12}
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
        }}>
        <Row gutter={[30, 30]}>
          <Col style={{ height: 0 }}>
            <Avatar
              src={urlAvatar}
              size={{ xs: 32, sm: 64, md: 80, lg: 128, xl: 160 }}
              icon={<AntDesignOutlined />}
              shape="circle"
            />
          </Col>
          <Col span={24}>
            <Upload {...propsUpload}>
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>
          </Col>
        </Row>
        <Col sm={24} md={12}>
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
              name="id"
              rules={[{ required: true, message: "Vui lòng nhập Id!" }]}>
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email không được để trống!" },
              ]}>
              <Input disabled />
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
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống!",
                },
              ]}>
              <Input />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default UserInfo;
