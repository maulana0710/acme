import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import imgLogin from "../../img/imgLogin.svg";
import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import Footer from "../user/components/Footer";
import axios from "axios";
import AcmeO2 from "../../img/AcmeO2.svg";

function BasicExample() {
  const [input, setInput] = useState({});
  let navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
    try {
      const response = axios.post("http://localhost:8080/user/login", {
        username: input.username,
        password: input.password,
      });
      response.then((result) => {
        try {
          if (result.data.success === true) {
            sessionStorage.setItem("user", JSON.stringify(result.data));
            navigate("/");
          } else {
            console.log("salah Password");
          }
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log("login gagal", error);
      throw error;
    }

    // if (userData.user_role === "user") {
    //   sessionStorage.setItem("user", JSON.stringify(userData));
    //   // console.log("youre user")
    // } else if (userData.user_role === "admin") {
    //   sessionStorage.setItem("user", JSON.stringify(userData));
    //   // console.log("youre admin");
    //   navigate("/AdminManager");
    // }
    //  else {
    //   console.log("Login Denied")
    // }
    //   } else {
    //     console.log("password error");
    //   }
    // } else {
    //   console.log("user error");
    // }
  };
  return (
    <>
        <h1 className="bg-light">
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
            <img style={{ width: "10%" }} src={AcmeO2} alt="AcmeO2" />
          </Link>
        </h1>
        <Container>
          <Row className="border mt-5 bg-light text-dark">
            <h1 className="fw-bold">LOGIN</h1>
            <Col xs={12} md={6}>
              <img className="d-block w-100" src={imgLogin} alt="login" />
            </Col>
            <Col xs={6} md={6} className=" mb-5">
              <Form className="m-2" onSubmit={handleSubmit}>
                <Form.Group className="mb-3 text-light" controlId="formBasicEmail">
                  <Form.Label className="text-dark">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    value={input.username || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 text-light" controlId="formBasicPassword">
                  <Form.Label className="text-dark">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={input.password || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Button
                      variant="success"
                      type="submit"
                      className="w-25 h-100"
                    >
                      Login
                    </Button>
                  </Col>
                  <Col>
                    <p className="d-flex justify-content-center">
                      <Nav.Link
                        variant="primary"
                        className="btn btn-primary text-light w-25 h-100"
                        href="/Signup"
                      >
                        Sign Up
                      </Nav.Link>
                    </p>
                  </Col>
                </Row>
                <p className="d-flex justify-content-center">
                  <Nav.Link
                    variant="primary"
                    className="text-dark text-decoration-underline"
                    href="/ForgotPassword"
                  >
                    Forgot Password?
                  </Nav.Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      <Footer />
    </>
  );
}

export default BasicExample;
