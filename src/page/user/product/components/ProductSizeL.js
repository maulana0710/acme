import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import AddCart from "./AddCart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductSizeL({ product = [], cart = [], userLogin = [] }) {
  // console.log("isi produk size L ", product);
  let navigate = useNavigate();
  
  console.log('userID', userLogin);
  const disc =
    (product.product_price * product.product_discountPercentage) / 100;
  const afterPrice = product.product_price - disc;

  const [carts] = React.useState(cart);
  const [productAmount, setProductAmount] = React.useState();
  console.log("carts", carts);
  console.log("productAmount", productAmount);
  const [amount, setAmount] = React.useState(1);
  const increase = () => {
    if (amount === product?.product_quantityStock) {
      setAmount(product?.product_quantityStock);
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
  React.useEffect(() => {
    setProductAmount({ ...product, itemAmount: amount, userUUID: userLogin?.user_uuid });
  }, [amount]);

  const btnFocusDisabled = {
    outline: "none",
    boxShadow: "none",
  };

  const buy = () => {
    // console.log("user ID :", userLogin?.user_uuid);
    // console.log("produk ID :", product?.product_uuid);
    // console.log("jumlah :", amount);
    try {
      axios.post("https://api.acmeo2.online/cart/add", {
        userUUID: userLogin?.user_uuid,
        productUUID: product?.product_uuid,
        cartValue: amount,
      });
      navigate("/PurchaseConfirmation");
    }
    catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Row className="border-bottom">
        <Col className="border-end">
          {product.product_quantityStock === 0 ? (
            <Row className="bg-danger">
              <Col>stock</Col>
              <Col>:</Col>
              <Col>{product?.product_quantityStock}</Col>
            </Row>
          ) : (
            <Row>
              <Col>stock</Col>
              <Col>:</Col>
              <Col>{product?.product_quantityStock}</Col>
            </Row>
          )}
        </Col>
        <Col>
          <Row>
            <Col>Category</Col>
            <Col>:</Col>
            <Col>{product?.product_category}</Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="border-end">
          <Row className="fs-3 justify-content-start ms-2">
            {product.product_discountPercentage > 0 ? (
              <>
                <Col
                  sm="auto"
                  className="text-warning border rounded-start bg-danger"
                  style={{ width: "max-content" }}
                >
                  {product.product_discountPercentage}%
                </Col>
                <Col sm="auto">
                  <del className="text-danger">
                    Rp.{product.product_price.toFixed(2)}
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
        {product.product_quantityStock === 0 ? (
          <>
            <Col sm={4} className="mt-3">
              <Row className="border ms-2 me-2">
                <Col className="d-flex align-content-center flex-wrap">
                  {amount}
                </Col>
                <Col className="d-flex justify-content-around p-0">
                  <Button
                    className="w-100 btn"
                    variant="dark"
                    style={btnFocusDisabled}
                    disabled
                    onClick={() => decrease()}
                  >
                    -
                  </Button>
                  <Button
                    className="w-100"
                    variant="dark"
                    style={btnFocusDisabled}
                    disabled
                    onClick={() => increase()}
                  >
                    +
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col sm={8} className="mt-3">
              <Button
                style={{}}
                variant="dark"
                className="border w-100"
                disabled
              >
                Tambah Ke Keranjang
              </Button>
            </Col>
            <Col className="mt-3">
              <Button style={{}} variant="light" className="w-100" disabled>
                Beli
              </Button>
            </Col>
            <p className="text-danger mt-4">
              Maaf, produk yang anda inginkan tidak tersedia
            </p>
          </>
        ) : (
          <>
            <Col sm={4} className="mt-3">
              <Row className="border ms-2 me-2">
                <Col className="d-flex align-content-center flex-wrap">
                  {amount}
                </Col>
                <Col className="d-flex justify-content-around p-0">
                  <Button
                    className="w-100 btn"
                    variant="dark"
                    style={btnFocusDisabled}
                    onClick={() => decrease()}
                  >
                    -
                  </Button>
                  <Button
                    className="w-100"
                    variant="dark"
                    style={btnFocusDisabled}
                    onClick={() => increase()}
                  >
                    +
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col sm={8} className="mt-3">
              <Button
                variant="dark"
                className="border w-100"
                onClick={() => AddCart(productAmount, carts)}
              >
                Tambah Ke Keranjang
              </Button>
            </Col>
            <Col className="mt-3">
              <Button variant="light" className="w-100" onClick={() => buy()}>
                Beli
              </Button>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}
export default ProductSizeL;
