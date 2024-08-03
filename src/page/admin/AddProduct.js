import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function AddProduct() {
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
      formData.append("name", input.name);
      formData.append("category", input.category);
      formData.append("series", input.series);
      formData.append("price", input.price);
      formData.append("discountPercentage", input.discountPercentage);
      formData.append("sku", input.sku);
      formData.append("quantityStock", input.quantityStock);
      formData.append("description", input.description);
      formData.append("file1", inputFile1);
      formData.append("file2", inputFile2);
      formData.append("file3", inputFile3);

      const response = await axios.post(
        `https://api.acmeo2.online/product/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.success);
      if (response.data.success === true) {
        navigate(`/AdminManager`, { state: { addhProductTrue: true } });
      }
    } catch (error) {
      console.log("gagal memperbarui", error);
      throw error;
    }
  };
  return (
    <>
      <Row className="border mt-5 bg-light justify-content-center">
        <h1>Tambah Produk</h1>
        <Col sm="2"></Col>
        <Col sm="8" className="mb-5">
          <Form className="m-2" onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formBasicName">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="name"
                  value={input.name || ""}
                  placeholder={"Masukan nama produk"}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formBasicCategory">
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
                  value={input.price || ""}
                  placeholder={"Masukan harga produk"}
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
                  value={input.discount || ""}
                  placeholder={"Masukan diskon produk"}
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
                  value={input.sku || ""}
                  placeholder={"Masukan SKU produk"}
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
                  value={input.stock || ""}
                  placeholder={"Masukan stok produk"}
                  onChange={handleChange}
                />
              </Col>
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
                  value={input.description || ""}
                  placeholder={"Masukan deskripsi produk"}
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
    </>
  );
}
export default AddProduct;
