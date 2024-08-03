import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Carousel,
  CloseButton,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../user/components/Footer";
import AcmeO2 from "../../img/AcmeO2.svg";

function PurchasingDetail({ orders = [] }) {
  const { uuid } = useParams();
  const [items, setItems] = useState();
  useEffect(() => {
    getItem();
  }, [orders]);
  const getItem = () => {
    var uuidOrder = orders?.find(function (el) {
      return el.order_uuid === uuid;
    });
    setItems(uuidOrder);
  };

  const disc = (items?.product_price * items?.product_discountPercentage) / 100;
  const afterPrice = items?.product_price - disc;
  const size = items?.product_sku.slice(-2).replaceAll(/[0-9]/g, "");

  const createdAt = new Date(items?.create_at);
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
  const [showImage, setShowImage] = useState(false);
  const toggleImage = () => {
    setShowImage(!showImage);
  };

  let navigate = useNavigate();
  // BELOM KELAR
  const confirm = async () => {
    console.log("konfirmasi");
    try {
      if (items?.order_status === "verifikasi persediaan") {
        const formData = new FormData();
        formData.append("status", "diproses");

        const response = await axios.post(
          `https://api.acmeo2.online/edit/${uuid}`,
          formData
        );
        console.log(response.data.success);
        try {
          if (response.data.success === true) {
            navigate("/AdminManager");
          } else {
            console.log("Gagal");
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (items?.order_status === "diproses") {
        const formData = new FormData();
        formData.append("status", "dikirim");

        const response = await axios.post(
          `https://api.acmeo2.online/edit/${uuid}`,
          formData
        );
        console.log(response.data.success);
        try {
          if (response.data.success === true) {
            navigate("/AdminManager");
          } else {
            console.log("Gagal");
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (items?.order_status === "dikirim") {
        const formData = new FormData();
        formData.append("status", "tiba ditujuan");

        const response = await axios.post(
          `https://api.acmeo2.online/edit/${uuid}`,
          formData
        );
        console.log(response.data.success);
        try {
          if (response.data.success === true) {
            navigate("/AdminManager");
          } else {
            console.log("Gagal");
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (items?.order_status === "tiba ditujuan") {
        const formData = new FormData();
        formData.append("status", "selesai");

        const response = await axios.post(
          `https://api.acmeo2.online/edit/${uuid}`,
          formData
        );
        console.log(response.data.success);
        try {
          if (response.data.success === true) {
            navigate("/AdminManager");
          } else {
            console.log("Gagal");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log("gagal memperbarui", error);
      throw error;
    }
  };
  const reject = async () => {
    console.log("ditolak");
    try {
      const formData = new FormData();
      formData.append("status", "ditolak");

      const response = await axios.post(
        `https://api.acmeo2.online/edit/${uuid}`,
        formData
      );
      console.log(response.data.success);
      try {
        if (response.data.success === true) {
          navigate("/AdminManager");
        } else {
          console.log("Gagal");
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log("gagal memperbarui", error);
      throw error;
    }
  };

  return (
    <div>
      {showImage ? (
        <div>
          <img
            className="position-absolute top-50 start-50 translate-middle h-100"
            style={{ zIndex: "2" }}
            src={items?.order_receipt}
            alt="Bukti Pembayaran"
          />
          <CloseButton
            variant="white"
            className="position-absolute top-0 end-50"
            style={{ zIndex: "3" }}
            onClick={() => toggleImage(false)}
          />
        </div>
      ) : (
        ""
      )}
      <div className={showImage ? "opacity-50" : ""}>
        <Navbar bg="light" variant="light" expand="lg" className="fs-5">
          <Container>
            <Navbar.Brand className="fw-bolder" style={{ width: "10%" }}>
              <Link
                to={`/`}
                className="text-light"
                style={{ textDecoration: "none" }}
              >
                <img src={AcmeO2} alt="AcmeO2" />
              </Link>
            </Navbar.Brand>
            <Nav.Link>
              <Link
                to={`/AdminManager`}
                className="text-light"
                style={{ textDecoration: "none" }}
              >
                Admin Manager
              </Link>
            </Nav.Link>
          </Container>
        </Navbar>
        <Container fluid className="bg-dark pb-4">
          <h3 className="text-light">Detail Pesanan</h3>
          <Row className="mb-4">
            <Col>
              <Container>
                <div className="bg-light rounded">
                  <Row className="flex-wrap m-2">
                    <Col
                      sm="4"
                      style={{ height: "100%" }}
                      className="border-end border-dark"
                    >
                      <Carousel variant="light" className="m-1">
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            style={
                              items?.product_imageUrl1 === "undefined"
                                ? { height: "22rem" }
                                : {}
                            }
                            src={items?.product_imageUrl1}
                            alt="First slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            style={
                              items?.product_imageUrl2 === "undefined"
                                ? { height: "22rem" }
                                : {}
                            }
                            src={items?.product_imageUrl2}
                            alt="Second slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            style={
                              items?.product_imageUrl3 === "undefined"
                                ? { height: "22rem" }
                                : {}
                            }
                            src={items?.product_imageUrl3}
                            alt="Third slide"
                          />
                        </Carousel.Item>
                      </Carousel>
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <h3 className="fw-bold m-2">{items?.product_name}</h3>
                        </Col>
                      </Row>
                      <Row
                        className="border-top border-end border-bottom text-light"
                        style={{ backgroundColor: "#474E68" }}
                      >
                        {items?.product_quantityStock === 0 ? (
                          <Col className="bg-danger p-2 text-light">
                            Storage Stock: {items?.product_quantityStock}
                          </Col>
                        ) : (
                          <Col className="p-2 text-light">
                            Storage Stock: {items?.product_quantityStock}
                          </Col>
                        )}
                        <Col
                          className="border-start border-end p-2"
                          style={{ backgroundColor: "#404258" }}
                        >
                          Category: {items?.product_category}
                        </Col>
                        <Col className="p-2">Size: {size}</Col>
                      </Row>
                      <Row className="border-top border-end border-bottom">
                        <Col className="border-end p-2 border-dark">
                          Pembeli : {items?.user_username}
                        </Col>
                        <Col className="p-2">
                          Waktu Pembelian: {formattedDate}
                        </Col>
                      </Row>
                      <Row>
                        {items?.order_status === "ditolak" ? (
                          <Col className="bg-danger p-2 text-light">
                            Status Pembelian : {items?.order_status}
                          </Col>
                        ) : (
                          <Col className="bg-success p-2 text-light">
                            Status Pembelian : {items?.order_status}
                          </Col>
                        )}
                        <Col></Col>
                      </Row>
                      <Row>
                        <Col className="p-2 fs-4 text-start">
                          {items?.product_discountPercentage > 0 ? (
                            <del className="text-danger">
                              Rp.{items?.product_price.toFixed(2)}
                            </del>
                          ) : (
                            ""
                          )}{" "}
                          Rp.{afterPrice.toFixed(2)}
                        </Col>
                        <Col className="p-2">
                          Discount: {items?.product_discountPercentage}%
                        </Col>
                      </Row>
                      <Row>
                        <Col className="p-2">
                          <Button variant="info" onClick={toggleImage}>
                            Bukti Pembayaran
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="justify-content-center border-top border-dark">
                    <p>Deskripsi</p>
                    <Col align="justify" className="ms-4 me-4">
                      {items?.product_description}
                    </Col>
                  </Row>
                  {items?.order_status === "selesai" ||
                  items?.order_status === "ditolak" ? (
                    <></>
                  ) : (
                    <Row className="justify-content-around">
                      <Col sm="auto">
                        <Button
                          className="w-100 mb-2 mt-2 fw-bold"
                          variant="danger"
                          onClick={() => reject()}
                        >
                          TOLAK
                        </Button>
                      </Col>
                      <Col sm="auto">
                        <Button
                          className="w-100 mb-2 mt-2 fw-bold"
                          variant="primary"
                          onClick={() => confirm()}
                        >
                          KONFIRMASI
                        </Button>
                      </Col>
                    </Row>
                  )}
                </div>
              </Container>
            </Col>
          </Row>
          <Footer />
        </Container>
      </div>
    </div>
  );
}
export default PurchasingDetail;
