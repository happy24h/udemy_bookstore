import { Form, Input, Row, Col, Button } from "antd";
import { useState } from "react";

function BookSearch(props) {
  const [bookTitle, setBookTitle] = useState();
  const [author, setAuthor] = useState();
  const [category, setCategory] = useState();
  const [clear, setClear] = useState(false);
  const handleConfirmSearch = () => {
    console.log("check name", bookTitle);
    let query = "";
    if (bookTitle) {
      query += `&mainText=/${bookTitle}/i`;
    }
    if (author) {
      query += `&author=/${author}/i`;
    }
    if (category) {
      query += `&category=/${category}/i`;
    }

    if (bookTitle || author || category) {
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
            name={`bookTitle`}
            label={`Tên sách`}>
            <Input
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item labelCol={{ span: 24 }} name={`author`} label={`Tác giả`}>
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }}
            name={`category`}
            label={`Thể loại`}>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
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

export default BookSearch;
