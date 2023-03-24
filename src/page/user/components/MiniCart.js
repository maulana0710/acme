import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../style/scroll.css";
import RemoveCartItem from "../RemoveCartItem";

function MiniCart({ item = [], cart = [], user = [] }) {
  // console.log("cek item in MiniCart", cart);
  const productsFilter = [];

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

  return (
    <>
      <Card style={{ height: "18rem" }} className="overflow-auto scroll">
        {productsFilter.map((value, index) => {
          const size = value.product_sku.slice(-2).replaceAll(/[0-9]/g, "");
          return (
            <Link
              to={`/DetailProduct/${value?.product_uuid}`}
              style={{ textDecoration: "none" }}
              key={index}
            >
              <Card.Body
                className="d-flex flex-wrap border text-dark"
                style={{ width: "16rem" }}
              >
                <Row>
                  <Col sm={4}>
                    <img
                      className="mt-1 mb-1 w-100"
                      src={value?.product_imageUrl1}
                      alt="preview"
                    />
                  </Col>
                  <Col sm={8}>
                    <Card.Title>
                      <h6>{value?.product_name}</h6>
                    </Card.Title>
                    <Row>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={RemoveCartItem()}
                          className="h-30 mt-2"
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col>Size: {size}</Col>
                  <Col>Jumlah Barang: {value?.cartValue}</Col>
                </Row>
              </Card.Body>
            </Link>
          );
        })}
      </Card>
    </>
  );
}

export default MiniCart;
