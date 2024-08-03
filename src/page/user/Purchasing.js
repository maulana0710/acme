import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import jwt_decode from 'jwt-decode';
import ColorSchemesExample from "./components/NavigationBar";
import Footer from "./components/Footer";
import AllProduct from "./product/AllProduct";
import FillExample from "./components/SidebarProfile";
function Purchasing({item, wishlist, cart}) {
    const sessionData = sessionStorage.getItem('user');
    const parseData = JSON.parse(sessionData);
    var decoded = jwt_decode(parseData?.token);
    const userLogin = decoded?.results[0]
     // get order
  const [order, setOrder] = useState([]);
  useEffect(() => {
    getOrder();
  }, []);
  const getOrder = async () => {
    await axios
      .get(`https://api.acmeo2.online/order/user/${userLogin?.user_uuid}`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setOrder(response.data.data);
      })
      .catch((err) => console.log(err));
  };
  // get order

  const [sidebarProfile, setSidebarProfile] = useState(false);
  const openSidebarProfile = () => {
    setSidebarProfile(true);
  };
  const closeSidebarProfile = () => {
    setSidebarProfile(false);
  };

  const [mCart, setMCart] = useState(false);
  const openMCart = (e) => {
    e.stopPropagation();
    setMCart(true);
  };
  const closeMCart = () => {
    setMCart(false);
  };
  return (
    <div className="text-dark overflow-hidden">
        <div
      className={
        sidebarProfile ? "bg-dark overflow-hidden" : "bg-dark overflow-hidden"
      }
    >
      <Row onClick={closeMCart}>
        {/* <Row> */}
        <Col
          sm={sidebarProfile ? 10 : 12}
          className={sidebarProfile ? "p-0" : ""}
        >
          <ColorSchemesExample
            SidebarProfile={() => openSidebarProfile()}
            item={item}
            cart={cart}
            mCart={mCart}
            openMCart={(e) => openMCart(e)}
            closeMCart={() => closeMCart()}
            activeIndex={true}
          />
          <div className={mCart || sidebarProfile ? "opacity-50" : ""}>
      <Container>
        <Row>
          <Col>
            {order.map((value, index) => {
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
                // second: "numeric",
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
                          Penerima : {value.order_receiver}
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
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
      </div>
        </Col>
        <Col
          sm={sidebarProfile ? 2 : 0}
          className={
            sidebarProfile
              ? "animate__fadeInRight p-0"
              : "animate__fadeOutRight"
          }
        >
          {sidebarProfile && (
            <FillExample SidebarProfile={() => closeSidebarProfile()} />
          )}
        </Col>
        <Footer />
      </Row>
    </div>
    </div>
  );
}

export default Purchasing;
