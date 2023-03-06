import { Button, Col, Row } from "react-bootstrap";

function ProductSizeXL({ product = [] }) {
  const disc =
    (product.product_price * product.product_discountPercentage) / 100;
  const afterPrice = product.product_price - disc;
  return (
    <div>
      <Row className="border-bottom">
        <Col className="border-end">
          <Row>
            <Col>stock</Col>
            <Col>:</Col>
            <Col>{product?.product_quantityStock}</Col>
          </Row>
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
      <Row>
        {product.product_quantityStock === 0 ? (
          <>
            <Col>
              <Button style={{ width: "8em" }} variant="light" disabled>
                Buy
              </Button>
            </Col>
            <Col className="opacity-50">
              <Button
                style={{ width: "8em" }}
                variant="dark"
                className="border"
                disabled
              >
                Add To Cart
              </Button>
            </Col>
            <p className="text-danger">
              Maaf, produk yang anda inginkan tidak tersedia
            </p>
          </>
        ) : (
          <>
            <Col>
              <Button style={{ width: "8em" }} variant="light">
                Buy
              </Button>
            </Col>
            <Col>
              <Button
                style={{ width: "8em" }}
                variant="dark"
                className="border"
              >
                Add To Cart
              </Button>
            </Col>
          </>
        )}
      </Row>
      <Row>
        <Col className="text-decoration-underline">Description</Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "justify" }}>
          {product.product_description}
        </Col>
      </Row>
    </div>
  );
}
export default ProductSizeXL;
