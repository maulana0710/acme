import { Button, Col, Form, Row } from "react-bootstrap";

function ProfileUser({ProfileUser}) {
  const userLogin = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <h1>Profile</h1>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formBasicName">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder={userLogin.user_username} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label column sm="2">
            Phone Number
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder={userLogin.user_phoneNumber} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicAddress">
          <Form.Label column sm="2">
            Address
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder={userLogin.user_address}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicPostcode">
          <Form.Label column sm="2">
            Postcode
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder={userLogin.user_postalCode}
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Confirm
        </Button>
      </Form>
    </>
  );
}
export default ProfileUser;
