import ColorSchemesExample from "./components/NavigationBar";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  Row,
  Toast,
} from "react-bootstrap";
import Footer from "./components/Footer";
import "../../style/hover.css";
import React, { useState } from "react";
import FillExample from "./components/SidebarProfile";
import AddCart from "./product/components/AddCart";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router";

function PurchaseConfirmation({ item = [], cart = [] }) {
  const [province, setProvince] = React.useState([]);
  // console.log(province);
  React.useEffect(() => {
    getProvince();
  }, []);
  const getProvince = async () => {
    try {
      const response = await axios.get(
        "https://api.rajaongkir.com/starter/city?key=87bd6dc95830c27642d07954bcfa9f2d"
        // {
        //   headers: { key: "87bd6dc95830c27642d07954bcfa9f2d" },
        // }
      );
      setProvince(response.data.rajaongkir.results);
      // .then(function (response) {
      // handle success
      // console.log(response);
    } catch (error) {
      // })
      console.log(error);
    }
  };

  const sessionData = sessionStorage.getItem("user");
  const [userLogin, setUserLogin] = React.useState();
  React.useEffect(() => {
    if (sessionData === null) {
      // console.log(sessionData);
    } else {
      const parseData = JSON.parse(sessionData);
      var decoded = jwt_decode(parseData?.token);
      // console.log(userLogin);
      setUserLogin(decoded?.results[0]);
    }
  }, [sessionData]);
  // console.log("barang =", item);
  // console.log("keranjang =", cart);
  const productsFilter = [];
  var userUUID = userLogin?.user_uuid;
  const cartUserAfterFilter = [];
  const uniqueUser = cart.filter((element) => {
    if (element.cart_userUUID === userUUID) {
      cartUserAfterFilter.push(element);
      return true;
    }
    return false;
  });
  // console.log('cartUserAfterFilter', cartUserAfterFilter);
  if (cart.length !== 0) {
    const productUuidAfterFilter = [];
    const findCart = item.filter((product) =>
      cartUserAfterFilter.find(
        (cart) => cart?.cart_productUUID === product?.product_uuid
      )
    );
    findCart.map((value) => {
      return productUuidAfterFilter.push(value.product_uuid);
    });
    // console.log('product uuid', productUuidAfterFilter);
    const products = item.map((product) => {
      if (productUuidAfterFilter.includes(product?.product_uuid)) {
        const cartValue = cartUserAfterFilter.find(
          (cart) => cart?.cart_productUUID === product?.product_uuid
        );
        return productsFilter.push({
          ...product,
          isCart: true,
          cartValue: cartValue?.cart_cartValue,
        });
      }
    });
  }
  const [input, setInput] = useState({});
  const [inputFile1, setInputFile1] = useState("");
  let navigate = useNavigate();

  const handleFileChange1 = (event) => {
    setInputFile1(event.target.files[0]);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("input", input);
    console.log(inputFile1);
    try {
      const formData = new FormData();
      formData.append("userUUID", userLogin?.user_uuid);
      formData.append("productUUID", productsFilter[0]?.product_uuid);
      formData.append("receiver", userLogin?.user_username);
      formData.append("phoneNumber", userLogin?.user_phoneNumber);
      formData.append("address", userLogin?.user_address);
      formData.append("postalCode", userLogin?.user_postalCode);
      formData.append("status", "verifikasi persediaan");
      formData.append("file1", inputFile1);

      const response = await axios.post(
        `http://localhost:8080/order/add`,
        formData
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      console.log(response.data.success);
      navigate("/PurchaseSuccessful");
    } catch (error) {
      console.log("gagal upload", error);
      throw error;
    }
  };

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

  const [totalPayments, setTotalPayments] = useState(0);

  React.useEffect(() => {
    const calculateTotalPayments = () => {
      let calculatedTotal = 0;
      productsFilter.forEach((value) => {
        const disc =
          (value?.product_price * value?.product_discountPercentage) / 100;
        const afterPrice = value?.product_price - disc;
        const afterCounting = afterPrice * value?.cartValue;
        calculatedTotal += afterCounting;
      });
      setTotalPayments(calculatedTotal);
    };

    calculateTotalPayments();
  }, [productsFilter]);

  // console.log("Total Payment:", totalPayments);

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  const [shippingCost, setShippingCost] = useState(0);
  // console.log(shippingCost?.rajaongkir?.results[0]?.costs[0]?.cost[0]?.value);
  const [inputCost, setInputCost] = useState({});
  const handleChangeCost = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputCost((values) => ({ ...values, [name]: value }));
  };
  // 9204bcb018a029939c1c50355612befe
  const handleSubmitCost = async (event) => {
    event.preventDefault();
    console.log("cek input :", inputCost?.destination);
    try {
      const formData = new FormData();
      formData.append("key", "87bd6dc95830c27642d07954bcfa9f2d");
      formData.append("origin", "115");
      formData.append("destination", `${inputCost?.destination}`);
      formData.append("weight", 1000);
      formData.append("courier", "jne");

      const response = await axios.post(
        `https://api.rajaongkir.com/starter/cost`,
        formData
      );

      setShippingCost(response.data);
    } catch (error) {
      console.log("gagal upload", error);
      throw error;
    }
  };

  const totalCost =
    shippingCost?.rajaongkir?.results[0]?.costs[0]?.cost[0]?.value +
    totalPayments;
  return (
    <div
      className={
        sidebarProfile
          ? "bg-dark text-light overflow-hidden"
          : "bg-dark text-light overflow-hidden"
      }
    >
      <Row onClick={closeMCart}>
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
          <h1 className="fw-bold">KONFIRMASI PEMBELIAN</h1>
          <Container
            className={mCart || sidebarProfile ? "opacity-50 mt-2" : "mt-2"}
          >
            <Form className="m-2" onSubmit={handleSubmit}>
              <Row>
                <Col>
                  {productsFilter.map((value, index) => {
                    const disc =
                      (value?.product_price *
                        value?.product_discountPercentage) /
                      100;
                    const afterPrice = value?.product_price - disc;
                    const size = value?.product_sku
                      .slice(-2)
                      .replaceAll(/[0-9]/g, "");
                    return (
                      <Row className="mb-4 bg-light text-dark border rounded">
                        <Col sm={2}>
                          <Carousel variant="dark" controls={false}>
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                style={
                                  value?.product_imageUrl1 === "undefined"
                                    ? { height: "22rem" }
                                    : {}
                                }
                                src={value?.product_imageUrl1}
                                alt="First slide"
                              />
                            </Carousel.Item>
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                style={
                                  value?.product_imageUrl2 === "undefined"
                                    ? { height: "22rem" }
                                    : {}
                                }
                                src={value?.product_imageUrl2}
                                alt="Second slide"
                              />
                            </Carousel.Item>
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                style={
                                  value?.product_imageUrl3 === "undefined"
                                    ? { height: "22rem" }
                                    : {}
                                }
                                src={value?.product_imageUrl3}
                                alt="Third slide"
                              />
                            </Carousel.Item>
                          </Carousel>
                        </Col>
                        <Col sm={10} className="border-start">
                          <Row className="border-bottom">
                            <Col className="border-end">
                              <h1 className="fw-bolder">
                                {value?.product_name}
                              </h1>
                            </Col>
                          </Row>
                          <Row className="border-bottom">
                            <Col className="border-end">
                              <Row>
                                <Col>Jumlah Produk dalam Keranjang</Col>
                                <Col>:</Col>
                                <Col>{value?.cartValue}</Col>
                              </Row>
                            </Col>
                            <Col>
                              <Row>
                                <Col>Category</Col>
                                <Col>:</Col>
                                <Col>{value?.product_category}</Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row className="mt-4">
                            <Col className="border-end">
                              <Row className="fs-3 justify-content-start ms-2">
                                {value.product_discountPercentage > 0 ? (
                                  <>
                                    <Col
                                      sm="auto"
                                      className="text-warning border rounded-start bg-danger"
                                      style={{ width: "max-content" }}
                                    >
                                      {value.product_discountPercentage}%
                                    </Col>
                                    <Col sm="auto">
                                      <del className="text-danger">
                                        Rp.{value.product_price.toFixed(2)}
                                      </del>
                                    </Col>
                                  </>
                                ) : (
                                  ""
                                )}{" "}
                                <Col sm="auto">Rp.{afterPrice.toFixed(2)}</Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    );
                  })}
                  <Row className="mb-4 bg-light">
                    <Col md={2}></Col>
                    <Col md='4' className="mt-3">
                      <Button
                        onClick={toggleShowA}
                        className="mb-2 border border-dark"
                        variant="light"
                      >
                        Konfirmasi Alamat
                      </Button>
                      <Toast show={showA} onClose={toggleShowA}>
                        <Form className="m-2" onSubmit={handleSubmitCost}>
                          <Row>
                            <Col sm='4'>
                              <Toast.Body className="text-dark">
                                Kota:
                              </Toast.Body>
                            </Col>
                            <Col>
                              <Form.Select
                                aria-label="Default select example"
                                name="destination"
                                onChange={handleChangeCost}
                              >
                                <option disabled>Pilih</option>
                                {province?.map((values) => {
                                  return (
                                    <option value={values?.city_id}>
                                      {values?.city_name}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Button
                                variant="light"
                                className="border"
                                onClick={(e) => handleSubmitCost(e)}
                              >
                                Masukan
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Toast>
                    </Col>
                    <Col sm="6" className="mt-3">
                      {shippingCost === 0 ? (
                        <Button
                          variant="primary"
                          className="border w-25"
                          type="submit"
                          disabled
                        >
                          Beli
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          className="border w-25"
                          type="submit"
                        >
                          Beli
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col sm="auto">
                  <Card style={{ width: "20rem" }}>
                    <Card.Body className="text-dark">
                      <Card.Title className="fw-bold border-bottom border-dark pb-2">
                        Ringkasan Belanja
                      </Card.Title>
                      <Row className="border-bottom">
                        <Col>
                          <Card.Text>Harga Barang</Card.Text>
                        </Col>
                        <Col className="align-self-center">
                          <Card.Text>Rp. {totalPayments}</Card.Text>
                        </Col>
                      </Row>
                      <Row className="border-bottom">
                        <Col>
                          <Card.Text>Harga Pengiriman</Card.Text>
                        </Col>
                        <Col className="align-self-center">
                          <Card.Text>
                            Rp.{" "}
                            {shippingCost === 0
                              ? "0000"
                              : shippingCost?.rajaongkir?.results[0]?.costs[0]
                                  ?.cost[0]?.value}
                          </Card.Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Card.Text>Total Harga</Card.Text>
                        </Col>
                        <Col className="align-self-center">
                          <Card.Text>
                            Rp. {shippingCost === 0 ? "0000" : totalCost}
                          </Card.Text>
                        </Col>
                      </Row>
                      <Row>
                        <Card.Text>Bukti Pembayaran</Card.Text>
                        <Col className="align-self-center">
                          <Card.Text>
                            <Form.Control
                              className="w-100"
                              accept=".pdf,.jpg,.png"
                              type="file"
                              id="image"
                              name="image"
                              required
                              onChange={handleFileChange1}
                            />
                          </Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Form>
          </Container>
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
      </Row>
      <Footer />
    </div>
  );
}
export default PurchaseConfirmation;
