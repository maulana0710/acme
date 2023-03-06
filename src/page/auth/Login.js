import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import imgLogin from "../../img/imgLogin.svg";
import { useState } from "react";
import { UserProvider } from "../user/Context";
import { Nav } from "react-bootstrap";
import Footer from "../user/components/Footer";

// import { useAtom } from "jotai";
// import { atomWithStore } from "jotai/zustand";
// import create from "zustand/vanilla";
// const store = create(() => ({ }));
// export const stateAtom = atomWithStore(store);

function BasicExample({ users }) {
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

    const userData = users.find((data) => data.user_username === username.value);
    if (userData) {
      console.log("user login", userData.user_username);
      if (userData.user_password === password.value) {
        if (userData.user_role === "user") {
          localStorage.setItem("user", JSON.stringify(userData));
          // console.log("youre user")
          navigate("/");
        } else if (userData.user_role === "admin") {
          localStorage.setItem("user", JSON.stringify(userData));
          // console.log("youre admin");
          navigate("/AdminManager");
        }
         else {
          console.log("Login Denied")
        }
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
            <h1>Login</h1>
            <Col xs={12} md={6}>
              <img className="d-block w-100" src={imgLogin} alt="login" />
            </Col>
            <Col xs={6} md={6} className=" mb-5">
              <Form className="m-2" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    value={input.username || ""}
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
                <Button variant="primary" type="submit">
                  Login
                </Button>
                <p className="d-flex justify-content-center">
                  Not a member?
                  <Nav.Link
                    variant="primary"
                    className="text-primary text-decoration-underline"
                    href="/Signup"
                  >
                    Sign Up
                  </Nav.Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </UserProvider>
      <Footer />
    </>
  );
}

export default BasicExample;
