import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment";

function UserViewDetail(props) {
  let { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } =
    props;
  const onClose = () => {
    setOpenViewDetail(false);
  };
  return (
    <>
      <Drawer
        title="Chức năng xem chi tiết"
        width={"50vw"}
        onClose={onClose}
        open={openViewDetail}>
        <Descriptions title="Thông tin người dùng" bordered column={2}>
          <Descriptions.Item label="ID">
            {dataViewDetail?._id}
          </Descriptions.Item>
          <Descriptions.Item label="Full Name">
            {dataViewDetail?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {dataViewDetail?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {dataViewDetail?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Role" span={2}>
            {dataViewDetail?.role}
          </Descriptions.Item>

          <Descriptions.Item label="Created At">
            {moment(dataViewDetail?.createdAt).format("DD-MM-YY HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {moment(dataViewDetail?.updatedAt).format("DD-MM-YY HH:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
}

export default UserViewDetail;
