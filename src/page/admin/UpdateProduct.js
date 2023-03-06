import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

// Masih Error di Item
function UpdateProduct({item}){
    const { id } = useParams();
    console.log(item[id-1])
    const [items , setItems] = useState();
    React.useEffect(() => {
      getItem();
    });
    const getItem = () => {
      setItems(item[id-1])
    }
    const [input, setInput] = useState({});
    // let navigate = useNavigate();
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInput((values) => ({ ...values, [name]: value }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(input);
    }
    return(
        <>
        <h1 className="bg-dark">
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/AdminManager">
            Admin Manager AcmeO<sup>2</sup>
          </Link>
        </h1>
        <Container>
          <Row className="border mt-5 bg-light justify-content-center">
            <h1>Update Product</h1>
            <Col sm='3' className="border" style={{ height:'20rem' }}>
                <img alt="Product IMG"/>
            </Col>
            <Col sm='8' className=" mb-5">
            <Form className="m-2" onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formBasicName">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder={items.product_name} onChange={handleChange}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicCategory">
          <Form.Label column sm="2">
            Category
          </Form.Label>
          <Col sm="10">
            <Form.Control type="radio" placeholder='' onChange={handleChange}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicSeries">
          <Form.Label column sm="2">
            Series
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="radio"
              placeholder=''
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicPrice">
          <Form.Label column sm="2">
            Price
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder={items.product_price}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicDiscountPercentage">
          <Form.Label column sm="2">
            Discount Percentage
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder={items.product_discountPercentage}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicSku">
          <Form.Label column sm="2">
            SKU
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder={items.product_sku}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicStorageStock">
          <Form.Label column sm="2">
            Storage Stock
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder={items.product_quantityStock}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicDescription">
          <Form.Label column sm="2">
            description
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder={items.product_description}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicImage">
          <Form.Label column sm="2">
            Image
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="file"
              placeholder={items.product_image}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Confirm
        </Button>
      </Form>
            </Col>
          </Row>
        </Container>
    </>
    )
}

export default UpdateProduct;