import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function Footer() {
  return (
    <Container>
      <Card className="text-dark">
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.{" "}
            </p>
            <footer className="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Footer;
