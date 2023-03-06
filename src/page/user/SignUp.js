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

// import { useAtom } from "jotai";
// import { atomWithStore } from "jotai/zustand";
// import create from "zustand/vanilla";
// const store = create(() => ({ }));
// export const stateAtom = atomWithStore(store);

function SignUp({ users }) {
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
    var { username, password } = document.forms[0];

    const userData = users.find((user) => user.username === username.value);
    if (userData) {
      console.log("user login", userData.username, userData.lastName);
      if (userData.password === password.value) {
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      } else {
        console.log("password error");
      }
    } else {
      console.log("user error");
    }
  };

  return (
    <>
      <UserProvider value={input}>
        <h1 className="bg-dark">
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
            AcmeO<sup>2</sup>
          </Link>
        </h1>
        <Container>
          <Row className="border mt-5 bg-light">
            <h1>SIGN UP</h1>
            <Col xs={12} md={6}>
              <img className="d-block w-100" src={imgLogin} alt="login" />
            </Col>
            <Col xs={6} md={6} className=" mb-5">
              <Form className="m-2" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    value={input.username || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    value={input.email || ""}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
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
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone Number"
                    name="phoneNumber"
                    value={input.phoneNumber || ""}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
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
