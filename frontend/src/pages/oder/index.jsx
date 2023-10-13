import {
  DeleteTwoTone,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Col,
  Divider,
  InputNumber,
  Row,
  Empty,
  Steps,
  Input,
  Form,
  Radio,
  notification,
  message,
  Result,
  Button,
} from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ViewOrder from "../../components/Order/ViewOrder";
// import Payment from "../../components/Order/Payment";
import {
  doDeleteItemCartAction,
  doUpdateCartAction,
  doPlaceOrderAction,
} from "../../redux/order/orderSlice";
import { callPlaceOrder } from "../../services/api";
import "./ViewOder.scss";

function ViewOder(props) {
  const [form] = Form.useForm();

  const carts = useSelector((state) => state.order.carts);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [currentStep, setCurrentStep] = useState(2);
  const [current, setCurrent] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  // const [infoUser, setInfoUser] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (carts && carts.length > 0) {
      let sum = 0;
      carts.map((item) => {
        sum += item.quantity * item.detail.price;
      });
      setTotalPrice(sum);
      if (current === 0) {
        setCurrent(1);
      }
    } else {
      setTotalPrice(0);
      if (current >= 2) {
        // setCurrent(3);
      } else {
        setCurrent(0);
      }
    }
  }, [carts]);

  const handleOnChangeInput = (value, book) => {
    if (!value || value < 1) return;
    if (!isNaN(value)) {
      dispatch(
        doUpdateCartAction({ quantity: value, detail: book, _id: book._id })
      );
    }
  };

  const handleBuy = () => {
    if (carts && carts.length > 0) {
      if (current === 1) {
        setCurrent(current + 1);
      } else if (current === 2) {
        form.submit();
        setCurrent(3);
      }
    } else {
      message.error("Vui lòng chọn sản phẩm !");
    }
  };

  const onFinish = async (values) => {
    setIsSubmit(true);
    const detailOrder = carts.map((item) => {
      return {
        bookName: item.detail.mainText,
        quantity: item.quantity,
        _id: item._id,
      };
    });

    const data = {
      name: values.name,
      address: values.address,
      phone: values.phone,
      totalPrice: totalPrice,
      detail: detailOrder,
    };
    const res = await callPlaceOrder(data);
    if (res && res.data) {
      message.success("Đặt hàng thành công !");
      dispatch(doPlaceOrderAction());
      setCurrent(3);
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  return (
    <div style={{ background: "#efefef", padding: "10px 0" }}>
      <div
        className="order-container"
        style={{ maxWidth: 1140, margin: "0 auto" }}
      >
        <div style={{ marginBottom: 15 }}>
          <Steps
            size="small"
            current={current}
            // status={"finish"}
            items={[
              {
                title: "Đơn hàng",
              },
              {
                title: "Địa chỉ nhận hàng",
              },
              {
                title: "Đặt hàng",
              },
            ]}
          />
        </div>
        {/* {currentStep === 0 && <ViewOder setCurrent={setCurrent} />} */}
        {current === 3 ? (
          <Result
            icon={<SmileOutlined />}
            title="Đơn hàng đã đặt thành công !"
            extra={
              <Link to="/history-order">
                <Button type="primary">Xem lịch sử</Button>
              </Link>
            }
          />
        ) : (
          <Row gutter={[20, 20]}>
            <Col md={18} xs={24}>
              {carts.length === 0 ? (
                <Empty
                  style={{ background: "#fff", height: "300px" }}
                  description={"Không có sản phẩm trong giỏ hàng"}
                />
              ) : (
                carts.map((book, index) => {
                  const currentBookPrice = book?.detail?.price ?? 0;
                  return (
                    <div className="order-book" key={`index-${index}`}>
                      <div className="book-content">
                        <img
                          src={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/images/book/${book?.detail?.thumbnail}`}
                        />
                        <div className="title">{book?.detail?.mainText}</div>
                        <div className="price">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(currentBookPrice)}
                        </div>
                        <div className="action">
                          <div className="quantity">
                            <InputNumber
                              onChange={(value) =>
                                handleOnChangeInput(value, book)
                              }
                              value={book.quantity}
                            />
                          </div>
                          <div className="sum">
                            Tổng:{" "}
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(currentBookPrice * book.quantity)}
                          </div>
                          <DeleteTwoTone
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              dispatch(
                                doDeleteItemCartAction({
                                  _id: book._id,
                                })
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </Col>
            <Col md={6} xs={24}>
              <div className="order-sum">
                {current === 2 ? (
                  <>
                    <Form layout="vertical" onFinish={onFinish} form={form}>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item
                            name="name"
                            label="Tên người nhận"
                            rules={[
                              {
                                required: true,
                                message: "Please enter user name",
                              },
                            ]}
                          >
                            <Input placeholder="Please enter user name" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name="phone"
                            label="Số điện thoại"
                            rules={[
                              {
                                required: true,
                                message: "Please enter phone number",
                              },
                            ]}
                          >
                            <Input placeholder="Please enter phone number" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name="address"
                            label="Địa chỉ"
                            rules={[
                              {
                                required: true,
                                message: "please enter address",
                              },
                            ]}
                          >
                            <Input.TextArea
                              rows={4}
                              placeholder="please enter address"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                    <div className="info">
                      <div className="method">
                        <div>Hình thức thanh toán</div>
                        <Radio checked>Thanh toán khi nhận hàng</Radio>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="calculate">
                    <span> Tạm tính</span>
                    <span>
                      {" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalPrice || 0)}
                    </span>
                  </div>
                )}

                <Divider style={{ margin: "10px 0" }} />
                <div className="calculate">
                  <span> Tổng tiền</span>
                  <span className="sum-final">
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalPrice || 0)}
                  </span>
                </div>
                <button onClick={handleBuy} disabled={isSubmit}>
                  {isSubmit && (
                    <span>
                      <LoadingOutlined /> &nbsp;
                    </span>
                  )}
                  Mua hàng ({carts?.length ?? 0}){" "}
                </button>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
}

export default ViewOder;
