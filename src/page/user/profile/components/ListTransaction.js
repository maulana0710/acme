import { Button, Col, Container, Row } from "react-bootstrap";
function ListTransaction({ item = [] }) {
  return (
    <div className="text-dark overflow-hidden">
      <Row>
        <Col>
          <h2>Pesanan Saya</h2>
          <Container>
            {item.map((value, index) => {
              return (
                <div className="bg-dark text-light m-2 rounded">
                  <Row>
                    <Col sm="2" style={{ height: "100%", width: "200px" }}>
                      <img
                        className="w-100 h-100 m-1"
                        src={value.product_imageUrl1}
                        alt="Img Product"
                      />
                    </Col>
                    <Col sm="8">
                      <Row>
                        <Col>
                          <h4>{value.product_name}</h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col>Storage Stock: {value.product_quantityStock}</Col>
                        <Col>Quantity:</Col>
                      </Row>
                      <Row>
                        <Col>description</Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Product User Buy</Col>
                    <Col>Total Payment: Rp.{value.product_price}.00</Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Button className="w-25 mb-2 mt-2" variant="primary">
                      Detail Pesanan
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

export default ListTransaction;
