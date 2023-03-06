import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../style/scroll.css";
import RemoveCartItem from "../RemoveCartItem";

function MiniCart({ item = [] }) {
  // console.log("cek item in MiniCart", item);
  const uniqueName = [];
  const unique = item.filter((element) => {
    const isDuplicate = uniqueName.includes(element.product_name);

    if (!isDuplicate) {
      uniqueName.push(element.product_name);
      return true;
    }
    return false;
  });
  return (
    <>
      <Card style={{ height: "18rem" }} className="overflow-auto scroll">
        {unique.map((value, index) => {
          return (
            <Link to={`/DetailProduct/${value.product_uuid}`} style={{ textDecoration:'none' }} key={index}>
              <Card.Body
                className="d-flex flex-wrap border text-dark"
                style={{ width: "16rem" }}
              >
                <Row>
                  <Col sm={4}>
                    <img
                      className="mt-1 mb-1 w-100"
                      src={value.product_imageUrl1}
                      alt="preview"
                    />
                  </Col>
                  <Col sm={8}>
                    <Card.Title>
                      <h6>{value.product_name}</h6>
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
                  <Col>
                  Jumlah Barang: {value.product_quantityStock}
                  </Col>
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
