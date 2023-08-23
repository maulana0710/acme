import React, { useState } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import ColorSchemesExample from "./components/NavigationBar";
import FillExample from "./components/SidebarProfile";
import Footer from "./components/Footer";

function PurchaseSuccessful() {
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
          />
          <h1 className="fw-bold">KONFIRMASI PEMBELIAN</h1>
          <Container
            fluid
            style={{ height: "40em", width: "50em" }}
            className={
              mCart || sidebarProfile
                ? "opacity-50 bg-light text-dark mb-4"
                : "bg-light text-dark mb-4"
            }
          >
            <div>
              <h1 className="fw-bold">Terima Kasih</h1>
              <hp className="fw-bold">pesanan anda akan kami konfirmasi</hp>
            </div>
            <Row className="align-items-end">
              <Col>
                <Button
                  className="mb-2"
                  variant="primary"
                  href="/"
                >
                  Home
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col
          sm={sidebarProfile ? 2 : 0}
          className={sidebarProfile ? "p-0" : ""}
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
export default PurchaseSuccessful;
