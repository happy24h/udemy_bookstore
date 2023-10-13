import { Statistic, Row, Col, Card } from "antd";
import { useEffect, useState } from "react";
import { callFetchDashboard } from "../../services/api";
import CountUp from "react-countup";

const AdminPage = () => {
  const [dataDashboard, setDataDashboard] = useState({
    countOrder: 0,
    countUser: 0,
  });
  useEffect(() => {
    const initDashboard = async () => {
      const res = await callFetchDashboard();
      if (res && res.data) {
        setDataDashboard(res.data);
      }
    };
    initDashboard();
  }, []);
  const formatter = (value) => <CountUp end={value} separator="," />;
  return (
    <Row gutter={[40, 40]}>
      <Col span={10}>
        <Card title="" bordered={false}>
          <Statistic
            title="Tổng Users"
            value={dataDashboard.countUser}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col span={10}>
        <Card title="" bordered={false}>
          <Statistic
            title="Tổng Orders"
            value={dataDashboard.countOrder}
            formatter={formatter}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default AdminPage;
