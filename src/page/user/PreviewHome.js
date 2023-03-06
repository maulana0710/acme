import { Carousel, Col, Container, Row } from "react-bootstrap";

function PreviewHome({ item }) {
  const sortedDataProduct = item.map(item => {
    return {
      ...item,
      sortableDate: new Date(item.create_at).getTime()
    };
  }).sort((a, b) => {
    return a.sortableDate - b.sortableDate;
  });
  return (
    <>
      <Container className="text-white">
        <Row className="mt-1 mb-1">
          <Col sm="8" className="card h-100 my-auto w-50 ms-auto">
            <img
              className="mt-1 mb-1"
              src={sortedDataProduct[1]?.product_imageUrl3}
              alt="preview"
            />
          </Col>
          <Col sm="4" className="me-auto my-auto">
            <Row>
              <Col className="card ms-1 mb-1 me-1">
                <img
                  className="mt-1 mb-1"
                  src={sortedDataProduct[5]?.product_imageUrl3}
                  alt="preview"
                />
              </Col>
            </Row>
            <Row>
              <Col className="card ms-1 mb-1 me-1">
                <Carousel variant="dark" className="mt-1 mb-1" controls={false}>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      style={
                        sortedDataProduct[1]?.product_imageUrl1 === "undefined"
                          ? { height: "22rem" }
                          : {}
                      }
                      src={sortedDataProduct[1]?.product_imageUrl1}
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      style={
                        sortedDataProduct[1]?.product_imageUrl2 === "undefined"
                          ? { height: "22rem" }
                          : {}
                      }
                      src={sortedDataProduct[1]?.product_imageUrl2}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      style={
                        sortedDataProduct[1]?.product_imageUrl3 === "undefined"
                          ? { height: "22rem" }
                          : {}
                      }
                      src={sortedDataProduct[1]?.product_imageUrl3}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>
              <Col className="card ms-1 mb-1 me-1">
                <Carousel variant="dark" className="mt-1 mb-1" controls={false}>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      style={
                        sortedDataProduct[5]?.product_imageUrl1 === "undefined"
                          ? { height: "22rem" }
                          : {}
                      }
                      src={sortedDataProduct[5]?.product_imageUrl1}
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      style={
                        sortedDataProduct[5]?.product_imageUrl2 === "undefined"
                          ? { height: "22rem" }
                          : {}
                      }
                      src={sortedDataProduct[5]?.product_imageUrl2}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      style={
                        sortedDataProduct[5]?.product_imageUrl3 === "undefined"
                          ? { height: "22rem" }
                          : {}
                      }
                      src={sortedDataProduct[5]?.product_imageUrl3}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PreviewHome;
