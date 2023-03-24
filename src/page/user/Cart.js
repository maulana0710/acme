import { useAtom } from "jotai";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import Footer from "./components/Footer";
import ColorSchemesExample from "./components/NavigationBar";
import "../../style/hover.css";
import React, { useState } from "react";
import { stateAtom } from "./StoreItemCartUser";
import FillExample from "./components/SidebarProfile";

function Cart({ item = [], cart = [] }) {
  const userLogin = JSON.parse(localStorage.getItem("user"));
  // console.log("barang =", item);
  // console.log("keranjang =", cart);
  const productsFilter = [];
  const [user] = React.useState(userLogin);

  var userUUID = user?.user_uuid;
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

  const [state, setState] = useAtom(stateAtom);
  // console.log("item =", state);

  const [productAmount, setProductAmount] = React.useState();
  const [amount, setAmount] = React.useState(1);
  const increase = () => {
    if (amount === productsFilter?.product_quantityStock) {
      setAmount(productsFilter?.product_quantityStock);
    } else {
      setAmount(amount + 1);
    }
  };
  const decrease = () => {
    if (amount === 1) {
      setAmount(1);
    } else {
      setAmount(amount - 1);
    }
  };

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
          <h1>Keranjang</h1>
          <Container
            className={mCart || sidebarProfile ? "opacity-50 mt-2" : "mt-2"}
          >
            <div>
              {productsFilter.map((value, index) => {
                const disc =
                  (value.product_price * value.product_discountPercentage) /
                  100;
                const afterPrice = value.product_price - disc;
                const size = value.product_sku
                  .slice(-2)
                  .replaceAll(/[0-9]/g, "");
                return (
                  <Row className="mt-4 mb-4 bg-light text-dark border rounded">
                    <Col sm={2}>
                      <Carousel variant="dark" controls={true}>
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
                          <h1 className="fw-bolder">{value?.product_name}</h1>
                        </Col>
                      </Row>
                      <Row className="border-bottom">
                        <Col className="border-end">
                          <Row>
                            <Col>stock</Col>
                            <Col>:</Col>
                            <Col>{value?.product_quantityStock}</Col>
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
                      <Row className="mt-4">
                        <>
                          <Col sm='auto' className="mt-3">
                            <Button
                              variant="success"
                              className="border w-100"
                              onClick={() =>
                                increase(productAmount, cartUserAfterFilter)
                              }
                            >
                              +
                            </Button>
                            <Button
                              variant="danger"
                              className="border w-100"
                              onClick={() =>
                                decrease(productAmount, cartUserAfterFilter)
                              }
                            >
                              -
                            </Button>
                          </Col>
                        </>
                      </Row>
                    </Col>
                  </Row>
                );
              })}
            </div>
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

export default Cart;
