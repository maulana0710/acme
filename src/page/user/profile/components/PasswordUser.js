import { Button, Col, Form, Row } from "react-bootstrap";

function PasswordUser({PasswordUser}) {
  // const userLogin = JSON.parse(sessionStorage.getItem("user"));
  return (
    <>
      <h1>Password</h1>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formBasicName">
          <Form.Label column sm="2">
            New Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder='Enter new password' />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label column sm="2">
            Confirm New Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder='Re-type new password' />
          </Col>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Confirm
        </Button>
      </Form>
    </>
  );
}
export default PasswordUser;
