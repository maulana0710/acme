import React, { useState } from "react";
import { Button, Carousel, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import AcmeO2 from "../../img/AcmeO2.svg";
import axios from "axios";
import Footer from "../user/components/Footer";

function UpdateProduct({ item }) {
  const { uuid } = useParams();
  // console.log(uuid);
  const [items, setItems] = useState();
  // console.log(items);
  React.useEffect(() => {
    getItem();
  }, [item]);
  const getItem = () => {
    var uuidUpdateProduct = item.find(function (el) {
      return el.product_uuid === uuid;
    });
    setItems(uuidUpdateProduct);
    // console.log(uuidUpdateProduct);
  };

  const [input, setInput] = useState({});
  const [inputFile1, setInputFile1] = useState("");
  const [inputFile2, setInputFile2] = useState("");
  const [inputFile3, setInputFile3] = useState("");

  const handleFileChange1 = (event) => {
    setInputFile1(event.target.files[0]);
  };
  const handleFileChange2 = (event) => {
    setInputFile2(event.target.files[0]);
  };
  const handleFileChange3 = (event) => {
    setInputFile3(event.target.files[0]);
  };
  let navigate = useNavigate();
  // console.log(input?.category);
  // console.log(input?.series);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(input);
    console.log("file1 :", inputFile1);
    console.log("file2 :", inputFile2);
    console.log("file3 :", inputFile3);
    try {
      const formData = new FormData();
      formData.append("name", input.name || items?.product_name);
      formData.append("category", input.category || items?.product_category);
      formData.append("series", input.series || items?.product_series);
      formData.append("price", input.price || items?.product_price);
      formData.append(
        "discountPercentage",
        input.discountPercentage || items?.product_discountPercentage
      );
      formData.append("sku", input.sku || items?.product_sku);
      formData.append(
        "quantityStock",
        input.quantityStock || items?.product_quantityStock
      );
      formData.append(
        "description",
        input.description || items?.product_description
      );
      formData.append("file1", inputFile1);
      formData.append("file2", inputFile2);
      formData.append("file3", inputFile3);

      const response = await axios.post(
        `https://api.acmeo2.online/edit/${items?.product_uuid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.success);
      if (response.data.success === true) {
        navigate(`/AdminManager`, { state: { updateProductTrue: true } });
      }
    } catch (error) {
      console.log("gagal memperbarui", error);
      throw error;
    }
  };

  return (
    <>
      <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
        <img style={{ width: "10%" }} src={AcmeO2} alt="AcmeO2" />
      </Link>
      <Container>
        <Row className="border mt-5 bg-light justify-content-center">
          <h1>Update Product</h1>
          <Col sm="3" className="border" style={{ height: "20rem" }}>
            <Carousel variant="dark" className="m-1">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  style={
                    items?.product_imageUrl1 === "undefined"
                      ? { height: "22rem" }
                      : {}
                  }
                  src={items?.product_imageUrl1}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  style={
                    items?.product_imageUrl2 === "undefined"
                      ? { height: "22rem" }
                      : {}
                  }
                  src={items?.product_imageUrl2}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  style={
                    items?.product_imageUrl3 === "undefined"
                      ? { height: "22rem" }
                      : {}
                  }
                  src={items?.product_imageUrl3}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col sm="8" className=" mb-5">
            <Form className="m-2" onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="formBasicName">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="name"
                    value={input.name || items?.product_name}
                    placeholder={items?.product_name}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formBasicCategory"
              >
                <Form.Label column sm="2">
                  Category
                </Form.Label>
                <Col sm="4">
                  <Form.Group>
                    <Row style={{ height: "1.5em" }}>
                      <Col>
                        <Form.Check
                          className="form-check-input-remove-focus p-0"
                          type="radio"
                          name="category"
                          value={"T-Shirt"}
                          label="T-Shirt"
                          checked={input?.category === "T-Shirt"}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col>
                        {items?.product_category === "T-Shirt" ? (
                          <p className="opacity-75">(default)</p>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                    <Row style={{ height: "1.5em" }}>
                      <Col>
                        <Form.Check
                          className="form-check-input-remove-focus p-0"
                          type="radio"
                          name="category"
                          value={"Pants"}
                          label="Pants"
                          checked={input?.category === "Pants"}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col>
                        {items?.product_category === "Pants" ? (
                          <p className="opacity-75">(default)</p>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                    <Row style={{ height: "1.5em" }}>
                      <Col>
                        <Form.Check
                          className="form-check-input-remove-focus p-0"
                          type="radio"
                          name="category"
                          value={"Accessories"}
                          label="Accessories"
                          checked={input?.category === "Accessories"}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col>
                        {items?.product_category === "Accessories" ? (
                          <p className="opacity-75">(default)</p>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                    <Row style={{ height: "1.5em" }}>
                      <Col>
                        <Form.Check
                          className="form-check-input-remove-focus p-0"
                          type="radio"
                          name="category"
                          value={"Jacket"}
                          label="Jacket"
                          checked={input?.category === "Jacket"}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col>
                        {items?.product_category === "Jacket" ? (
                          <p className="opacity-75">(default)</p>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formBasicSeries">
                <Form.Label column sm="2">
                  Series
                </Form.Label>
                <Col sm="6">
                  <Form.Group>
                    <Row style={{ height: "1.5em" }}>
                      <Col>
                        <Form.Check
                          className="form-check-input-remove-focus p-0"
                          type="radio"
                          name="series"
                          value={"Depression"}
                          label="Series Depression"
                          checked={input?.series === "Depression"}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col>
                        {items?.product_series === "Depression" ? (
                          <p className="opacity-75">(default)</p>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Check
                          className="form-check-input-remove-focus p-0"
                          type="radio"
                          name="series"
                          value={"Happiness"}
                          label="Series Happiness"
                          checked={input?.series === "Happiness"}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col>
                        {items?.product_series === "Happiness" ? (
                          <p className="opacity-75">(default)</p>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formBasicPrice">
                <Form.Label column sm="2">
                  Price
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="price"
                    value={input.price || items?.product_price}
                    placeholder={items?.product_price}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formBasicDiscountPercentage"
              >
                <Form.Label column sm="2">
                  Discount Percentage
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="discount"
                    value={input.discount || items?.product_discountPercentage}
                    placeholder={items?.product_discountPercentage}
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
                    name="sku"
                    value={input.sku || items?.product_sku}
                    placeholder={items?.product_sku}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formBasicStorageStock"
              >
                <Form.Label column sm="2">
                  Storage Stock
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="stock"
                    value={input.stock || items?.product_quantityStock}
                    placeholder={items?.product_quantityStock}
                    onChange={handleChange}
                  />
                </Col>
                {items?.product_quantityStock === 0 ? (
                  <Form.Label className="text-danger d-flex justify-content-start mb-4">
                    Stok Barang Habis!
                  </Form.Label>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formBasicDescription"
              >
                <Form.Label column sm="2">
                  description
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="description"
                    value={input.description || items?.product_description}
                    placeholder={items?.product_description}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formBasicImage">
                <Row>
                  <Col sm="2">
                    <Form.Label column sm="2">
                      Image
                    </Form.Label>
                  </Col>
                  <Col>
                    <Row>
                      <Col sm="auto" className="m-2">
                        <Form.Control
                          type="file"
                          name="image"
                          onChange={handleFileChange1}
                        />
                      </Col>
                      <Col sm="auto" className="m-2">
                        <Form.Control
                          type="file"
                          name="image"
                          onChange={handleFileChange2}
                        />
                      </Col>
                      <Col sm="auto" className="m-2">
                        <Form.Control
                          type="file"
                          name="image"
                          onChange={handleFileChange3}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form.Group>
              <Button variant="primary" type="submit">
                Confirm
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default UpdateProduct;
