import { useState } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import Footer from "../components/Footer";
import ColorSchemesExample from "../components/NavigationBar";
import FillExample from "../components/SidebarProfile";

function Wishlist({item = []}){
    const [sidebarProfile, setSidebarProfile] = useState(false);
    const openSidebatProfile = () => {
      setSidebarProfile(true);
    };
    const closeSidebarProfile = () => {
      setSidebarProfile(false);
    };
  
    const [mCart, setMCart] = useState(false);
    const openMCart = (e) => {
      e.stopPropagation();
      setMCart(true);
    };
    const closeMCart = () => {
      setMCart(false);
    };
    return (
    <>
    <Row className="bg-dark text-light" onClick={closeMCart}>
        <Col
          sm={sidebarProfile ? 10 : 12}
          className={sidebarProfile ? "p-0" : ""}
        >
          <ColorSchemesExample 
          SidebarProfile={() => openSidebatProfile()} 
          mCart={mCart}
            openMCart={(e) => openMCart(e)}
            closeMCart={() => closeMCart()}
          item={item}
          />
          <h1>Wishlist</h1>
          <Container fluid className={mCart || sidebarProfile ? "opacity-50 bg-light text-dark " : "bg-light text-dark"}>
          <Stack direction="horizontal" gap={3}>
              <div>
                <Row className="text-dark">
                  {item.map((value, index) => {
                    return (
                      <Col xs={6} md={4} key={index} className="mt-4">
                        <Card className="w-100">
                          <Card.Img
                            variant="top"
                            src={value.product_imageUrl1}
                            className=""
                            alt="imgCard"
                          />
                          <Card.Body>
                            <Card.Title>{value.title}</Card.Title>
                            <Card.Text>
                              "Some quick example text to build on the card
                              title and make up the bulk of the card's content."
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
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
        <Col
          sm={sidebarProfile ? 2 : 0}
          className={
            sidebarProfile
              ? "p-0"
              : ""
          }
        >
          {sidebarProfile && (
            <FillExample SidebarProfile={() => closeSidebarProfile()} />
          )}
        </Col>
        <Footer />
      </Row>
    </>
    );
}
export default Wishlist;