import { Form, Input, Row, Col, Button } from "antd";
import { useState } from "react";

function InputSearch(props) {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [clear, setClear] = useState(false);
  const handleConfirmSearch = () => {
    console.log("check name", fullName);
    let query = "";
    if (fullName) {
      query += `&fullName=/${fullName}/i`;
    }
    if (email) {
      query += `&email=/${email}/i`;
    }
    if (phone) {
      query += `&phone=/${phone}/i`;
    }

    if (fullName || email || phone) {
      props.handleSearch(query);
    } else {
      props.handleSearch("");
    }
  };
  const handleClearInput = () => {
    alert("hello world");
  };
  return (
    <Form>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }}
            name={`fullName`}
            label={`Full name`}>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item labelCol={{ span: 24 }} name={`email`} label={`Email`}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item labelCol={{ span: 24 }} name={`phone`} label={`Phone`}>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Item>
        </Col>
      </Row>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: 25,
        }}>
        <Button
          type="primary"
          onClick={handleConfirmSearch}
          style={{ marginRight: 12 }}>
          Search
        </Button>
        <Button type="primary" danger onClick={() => handleClearInput()}>
          Clear
        </Button>
      </div>
    </Form>
  );
}

export default InputSearch;
