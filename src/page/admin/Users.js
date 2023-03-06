import { Card, Col, Container, Row, Stack } from "react-bootstrap";

function Users({users}) {
    return(
        <>
        <Col>
      <h1>Users</h1>
      <Container>
        <Stack direction="horizontal" gap={3}>
          <div>
            <Row className="text-dark">
              {users.map((value, index) => {
                return (
                  <Col xs={6} md={4} key={index} className="mt-4">
                    <Card className="w-100">
                      <Card.Img
                        variant="top"
                        src=''
                        // {value.images[0]}
                        className=""
                        alt="imgCard"
                      />
                      <Card.Body>
                        <Card.Title>{value.user_username}</Card.Title>
                        <Card.Text>
                          "Some quick example text to build on the card title
                          and make up the bulk of the card's content."
                        </Card.Text>
                        {/* <Button variant="primary">Detail Product</Button> */}
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
    )
}
export default Users;