import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Footer from "./Footer";
import ColorSchemesExample from "./NavigationBar";
import FillExample from "./SidebarProfile";

function PaymentUser({ item }) {
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
    <div className="bg-dark text-light">
      <Row onClick={closeMCart}>
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
           <Container fluid className={mCart || sidebarProfile ? "opacity-50" : ""}>
          <h1>Pembayaran</h1>
          <Row sm={2} className="justify-content-center">
            <table className="border mb-4">
              <tr>
                <th className="border">Nama Produk</th>
                <th className="border">Harga Produk</th>
                <th className="border">size</th>
              </tr>
              {item.map((value) => {
                return (
                  <tr>
                    <td className="border">{value.product_name}</td>
                    <td className="border">RP. {value.product_price}</td>
                    <td className="border">
                      {value.product_sku.slice(-2).replaceAll(/[0-9]/g, "")}
                    </td>
                  </tr>
                );
              })}
            </table>
          </Row>
          <Row className="justify-content-center mb-4">
            <form className="m-2">
              <Row className="justify-content-center" sm={4}>
              <Col><label>Masukan Bukti Transfer</label></Col>
              <Col>: <input type="file"></input></Col>
              </Row>
            </form>
              <Button className="w-25">Confirm</Button>
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
    </div>
  );
}
export default PaymentUser;
