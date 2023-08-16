import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import imgLogin from "../../img/imgLogin.svg";
import { useState } from "react";
import { UserProvider } from "./Context";
import Footer from "./components/Footer";
import axios from "axios";
import AcmeO2 from "../../img/AcmeO2.svg";

// import { useAtom } from "jotai";
// import { atomWithStore } from "jotai/zustand";
// import create from "zustand/vanilla";
// const store = create(() => ({ }));
// export const stateAtom = atomWithStore(store);

function SignUp() {
  const [input, setInput] = useState({});
  const [userUsed, setUserUsed] = useState(true);
  console.log(userUsed);
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
      const response = axios.post("http://localhost:8080/user/add", {
        username: input.username,
        password: input.password,
        role: "user",
        phoneNumber: input.phoneNumber,
        address: "",
        postalCode: "",
      });
      // console.log(response);
      response.then((result) => {
        try {
          if (result.data.success === false) {
            console.log("Username Telah Digunakan");
            setUserUsed(false);
          } else {
            setUserUsed(true);
            console.log("username dapat digunakan");
            navigate("/Login");
          }
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log("gagal mendaftar", error);
      throw error;
    }
  };

  return (
    <>
      <UserProvider value={input}>
        <h1 className="bg-light">
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
            <img style={{ width: "10%" }} src={AcmeO2} alt="AcmeO2" />
          </Link>
        </h1>
        <Container>
          <Row className="border mt-5 bg-light text-dark">
            <h1 className="fw-bold">SIGN UP</h1>
            <Col xs={12} md={6}>
              <img className="d-block w-100" src={imgLogin} alt="login" />
            </Col>
            <Col xs={6} md={6} className=" mb-5">
              <Form className="m-2" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  {userUsed ? (
                    <Form.Label>Username</Form.Label>
                  ) : (
                    <Form.Label className="text-danger">
                      Username Telah Digunakan
                    </Form.Label>
                  )}
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    value={input.username || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={input.password || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone Number"
                    name="phoneNumber"
                    value={input.phoneNumber || ""}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Button variant="success" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </UserProvider>
      <Footer />
    </>
  );
}

export default SignUp;
