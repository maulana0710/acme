import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import imgLogin from "../../img/imgLogin.svg";
import { useState } from "react";
import Footer from "./components/Footer";
import axios from "axios";
import AcmeO2 from "../../img/AcmeO2.svg";

function ForgotPassword() {
  const [input, setInput] = useState({});
  const [userFound, setUserFound] = useState(false);
  const [userNotFound, setUserNotFound] = useState();
  const [passwordMatch, setPasswordMatch] = useState();
  const [data, setData] = useState();
  const [uuid, setUuid] = useState();
  // console.log("cek data :", data);
  // console.log("cek uuid :", uuid);
  // console.log("cek password match :", passwordMatch);
  // console.log("cek user found :", userFound);
  let navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
    if (userFound === false) {
      try {
        const response = axios.post(
          "https://api.acmeo2.online/user/resetPassword",
          {
            username: input.username,
            phoneNumber: input.phoneNumber,
          }
        );
        // console.log(response);
        response.then((result) => {
          try {
            if (result.data.success === false) {
              console.log("Username Tidak Ditemukan");
              setUserFound(false);
              setUserNotFound(false);
              setPasswordMatch(undefined);
            } else {
              setUserFound(true);
              setUserNotFound(true);
              setPasswordMatch(undefined);
              setData(result?.data.data)
              setUuid(result?.data.data.user_uuid)
              console.log("Username Ditemukan");
              console.log(result?.data.data);
              // navigate("/Login");
            }
          } catch (error) {
            console.log(error);
          }
        });
      } catch (error) {
        console.log("gagal menginput", error);
        throw error;
      }
    } else {
      if (input?.newPassword === input?.confirmNewPassword) {
        console.log("password baru dan konfirmasi password COCOK");
        setPasswordMatch(true);
        try {
          const response = axios.post(
            `https://api.acmeo2.online/user/edit/${uuid}`,
            {
              username: input.username,
              password: input.newPassword,
              phoneNumber: input.phoneNumber,
              address: data.user_address,
              postalCode: data.user_postalCode,
              role: data.user_role,
            }
          );
          // console.log(response);
          response.then((result) => {
            try {
              if (result.data.success === true) {
                console.log(result);
                navigate("/Login");
              } 
            } catch (error) {
              console.log(error);
            }
          });
        } catch (error) {
          console.log("gagal menginput", error);
          throw error;
        }
      } else {
        console.log("password baru dan konfirmasi password TIDAK COCOK");
        setPasswordMatch(false);
      }
      console.log(input?.newPassword);
    }
  };

  return (
    <>
      <h1 className="bg-light">
        <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
          <img style={{ width: "10%" }} src={AcmeO2} alt="AcmeO2" />
        </Link>
      </h1>
      <Container>
        {userNotFound === false ? (
          <>
            <Row className="border mt-5 bg-light text-dark">
              <h1 className="fw-bold">FORGOT PASSWORD?</h1>
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
                    <Form.Label className="text-danger d-flex justify-content-start mb-4">
                      Username Tidak Ditemukan!
                    </Form.Label>
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
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </>
        ) : (
          <>
            {userFound ? (
              <>
                <Row className="border mt-5 bg-light text-dark">
                  <h1 className="fw-bold">FORGOT PASSWORD?</h1>
                  <Col xs={12} md={6}>
                    <img className="d-block w-100" src={imgLogin} alt="login" />
                  </Col>
                  <Col xs={6} md={6} className=" mb-5">
                    <Form className="m-2" onSubmit={handleSubmit}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password Baru</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Masukan Password Baru"
                          name="newPassword"
                          value={input.newPassword || ""}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      {passwordMatch === undefined ? (
                        <>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicConfirmPassword"
                          >
                            <Form.Label>Konfirmasi Password Baru</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Masukan Kembali Password Baru"
                              name="confirmNewPassword"
                              value={input.confirmNewPassword || ""}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </>
                      ) : (
                        <>
                          {passwordMatch ? (
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicConfirmPassword"
                            >
                              <Form.Label>Konfirmasi Password Baru</Form.Label>
                              <Form.Control
                                type="password"
                                placeholder="Masukan Kembali Password Baru"
                                name="confirmNewPassword"
                                value={input.confirmNewPassword || ""}
                                onChange={handleChange}
                                required
                              />
                            </Form.Group>
                          ) : (
                            <>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicConfirmPassword"
                              >
                                <Form.Label>
                                  Konfirmasi Password Baru
                                </Form.Label>
                                <Form.Control
                                  type="password"
                                  placeholder="Masukan Kembali Password Baru"
                                  name="confirmNewPassword"
                                  value={input.confirmNewPassword || ""}
                                  onChange={handleChange}
                                  required
                                  isInvalid
                                />
                              </Form.Group>
                              <Form.Label className="text-danger d-flex justify-content-start mb-4">
                                Password Tidak Cocok!
                              </Form.Label>
                            </>
                          )}
                        </>
                      )}
                      <Row>
                        <Button variant="success" type="submit">
                          Submit
                        </Button>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row className="border mt-5 bg-light text-dark">
                  <h1 className="fw-bold">FORGOT PASSWORD?</h1>
                  <Col xs={12} md={6}>
                    <img className="d-block w-100" src={imgLogin} alt="login" />
                  </Col>
                  <Col xs={6} md={6} className=" mb-5">
                    <Form className="m-2" onSubmit={handleSubmit}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicUsername"
                      >
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
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPhoneNumber"
                      >
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
                        Submit
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </>
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default ForgotPassword;
