import axios from "axios";
import React, { useState } from "react";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  React.useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    await axios
      // .get("https://0db3-180-252-88-22.ngrok-free.app/order/filtered")
      .get("https://api.acmeo2.online/order/filtered")
      .then(function (response) {
        // handle success
        // console.log(response);
        setOrders(response.data.data);
        // console.log(response.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            {orders.map((value, index) => {
              const disc =
                (value.product_price * value.product_discountPercentage) / 100;
              const afterPrice = value.product_price - disc;
              const size = value.product_sku.slice(-2).replaceAll(/[0-9]/g, "");

              const createdAt = new Date(value?.create_at);
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                timeZoneName: "short",
              };
              const formattedDate = createdAt.toLocaleDateString("id", options);

              return (
                <div key={index} className="bg-dark text-light rounded">
                  <Row className="flex-wrap m-2">
                    <Col
                      sm="4"
                      style={{ height: "100%" }}
                      className="border-end"
                    >
                      <Carousel variant="dark" className="m-1">
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            style={
                              value.product_imageUrl1 === "undefined"
                                ? { height: "22rem" }
                                : {}
                            }
                            src={value.product_imageUrl1}
                            alt="First slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            style={
                              value.product_imageUrl2 === "undefined"
                                ? { height: "22rem" }
                                : {}
                            }
                            src={value.product_imageUrl2}
                            alt="Second slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            style={
                              value.product_imageUrl3 === "undefined"
                                ? { height: "22rem" }
                                : {}
                            }
                            src={value.product_imageUrl3}
                            alt="Third slide"
                          />
                        </Carousel.Item>
                      </Carousel>
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <h3 className="fw-bold m-2">{value.product_name}</h3>
                        </Col>
                      </Row>
                      <Row
                        className="border-top border-end border-bottom"
                        style={{ backgroundColor: "#474E68" }}
                      >
                        {value.product_quantityStock === 0 ? (
                          <Col className="bg-danger p-2">
                            Storage Stock: {value.product_quantityStock}
                          </Col>
                        ) : (
                          <Col className="p-2">
                            Storage Stock: {value.product_quantityStock}
                          </Col>
                        )}
                        <Col
                          className="border-start border-end p-2"
                          style={{ backgroundColor: "#404258" }}
                        >
                          Category: {value.product_category}
                        </Col>
                        <Col className="p-2">Size: {size}</Col>
                      </Row>
                      <Row className="border-top border-end border-bottom">
                        <Col className="border-end p-2">
                          Pembeli : {value.user_username}
                        </Col>
                        <Col className="p-2">
                          Waktu Pembelian: {formattedDate}
                        </Col>
                      </Row>
                      <Row>
                        {value?.order_status === "ditolak" ? (
                          <Col className="bg-danger p-2">
                            Status Pembelian : {value.order_status}
                          </Col>
                        ) : (
                          <Col className="bg-success p-2">
                            Status Pembelian : {value.order_status}
                          </Col>
                        )}
                        <Col></Col>
                      </Row>
                      <Row>
                        <Col className="p-2 fs-4 text-start">
                          {value.product_discountPercentage > 0 ? (
                            <del className="text-danger">
                              Rp.{value.product_price.toFixed(2)}
                            </del>
                          ) : (
                            ""
                          )}{" "}
                          Rp.{afterPrice.toFixed(2)}
                        </Col>
                        <Col className="p-2">
                          Discount: {value.product_discountPercentage}%
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Button className="w-25 mb-2 mt-2" variant="primary">
                      <Link
                        to={`/PurchaseDetail/${value?.order_uuid}`}
                        className="text-light"
                        style={{ textDecoration: "none" }}
                        >
                        Detail
                        Pesanan
                      </Link>
                    </Button>
                  </Row>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Orders;
