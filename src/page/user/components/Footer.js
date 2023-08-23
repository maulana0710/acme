import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function Footer() {
  return (
    <Container fluid>
      <Card className="text-dark">
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <footer className="blockquote-footer">©2023</footer>
          </blockquote>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Footer;
