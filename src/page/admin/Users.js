import { Card, Col, Container, Row, Stack } from "react-bootstrap";

function Users({ users }) {
  return (
    <>
      <Col>
        <h1>Users</h1>
        <Container>
          <Stack direction="horizontal" gap={3}>
            <div>
              <Row className="text-dark">
                {users.map((value, index) => {
                  let acronym = value.user_username
                    .split(/\s/)
                    .reduce(
                      (response, word) => (response += word.slice(0, 1)),
                      ""
                    )
                    .toUpperCase();
                  return (
                    <Col xs={6} md={4} key={index} className="mt-4">
                      <Card className="w-100">
                        <Row className="justify-content-center">
                          <h1
                            className="border rounded-circle mb-2 bg-secondary"
                            style={{
                              width: "max-content",
                              height: "max-content",
                            }}
                          >
                            {acronym}
                          </h1>
                        </Row>
                        <Card.Body style={{ maxWidth: "25em" }}>
                          <Card.Title>{value.user_username}</Card.Title>
                          <Row>
                            <Col sm='5'>Role:</Col>
                            <Col>{value?.user_role}</Col>
                          </Row>
                          <Row>
                            <Col sm='5'>No Telepon:</Col>
                            <Col>{value?.user_phoneNumber}</Col>
                          </Row>
                          <Row>
                            <Col sm='5'>Alamat:</Col>
                            <Col align='justify'>{value?.user_address}</Col>
                          </Row>
                          <Row>
                            <Col sm='5'>Kode Pos:</Col>
                            <Col align='justify'>{value?.user_postalCode}</Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Stack>
        </Container>
      </Col>
    </>
  );
}
export default Users;
