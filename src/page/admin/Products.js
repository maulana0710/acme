import { Button, Carousel, Col, Container, Row } from "react-bootstrap";

function Products({ item }) {
  const sortedData = item.map(item => {
    return {
      ...item,
      sortableDate: new Date(item.create_at).getTime()
    };
  }).sort((a, b) => {
    return a.sortableDate - b.sortableDate;
  });
  // console.log(sortedData);

  return (
    <div className="text-dark overflow-hidden">
      <Row>
        <Col>
          <h2>Products</h2>
          <Container>
            {sortedData.map((value, index) => {
              const disc =
                (value.product_price * value.product_discountPercentage) / 100;
              const afterPrice = value.product_price - disc;
              const size = value.product_sku.slice(-2).replaceAll(/[0-9]/g, "");
              return (
                <div key={index} className="bg-dark text-light m-2 rounded">
                  <Row className="flex-wrap">
                    <Col sm="4" style={{ height: "100%" }}>
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
                    <Col sm="">
                      <Row>
                        <Col>
                          <h4>{value.product_name}</h4>
                        </Col>
                      </Row>
                      <Row
                        className="rounded w-100"
                        style={{ backgroundColor: "#474E68" }}
                      >
                        <Col>Storage Stock: {value.product_quantityStock}</Col>
                        <Col style={{ backgroundColor: "#404258" }}>
                          Category: {value.product_category}
                        </Col>
                        <Col>Size: {size}</Col>
                      </Row>
                      <Row>
                        <Col>
                          description:
                          <p
                            className="overflow-auto h-75 scroll pe-3 me-2 border"
                            style={{ textAlign: "justify" }}
                          >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum. Lorem ipsum
                            dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum. Lorem ipsum
                            dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          Price:{" "}
                          {value.product_discountPercentage > 0 ? (
                            <del className="text-danger">
                              Rp.{value.product_price}
                            </del>
                          ) : (
                            ""
                          )}{" "}
                          Rp.{afterPrice.toFixed(2)}
                        </Col>
                        <Col>Discount: {value.product_discountPercentage}%</Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Button
                      className="w-25 mb-2 mt-2"
                      variant="success"
                      href={`UpdateProduct/${value.product_uuid}`}
                    >
                      Update Product
                    </Button>
                  </Row>
                </div>
              );
            })}
          </Container>
        </Col>
      </Row>
    </div>
  );
}
export default Products;
