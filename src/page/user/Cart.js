import { useAtom } from "jotai";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "./components/Footer";
import ColorSchemesExample from "./components/NavigationBar";
import "../../style/hover.css";
import React, { useState } from "react";
import { stateAtom } from "./StoreItemCartUser";
import FillExample from "./components/SidebarProfile";

function Cart({ item = [], cart = [] }) {
  // console.log("item =", barang);
  const [sidebarProfile, setSidebarProfile] = useState(false);
  const openSidebatProfile = () => {
    setSidebarProfile(true);
  };
  const closeSidebarProfile = () => {
    setSidebarProfile(false);
  };

  const [state, setState] = useAtom(stateAtom);
  console.log("item =", state);

  const increment = () => {

    const itemData = item.find((item) => item.id === item.key);
    if (itemData) {
      console.log("tambah");
    } else {
      console.log("tambah error");
    }
  };

  return (
    <div className="bg-dark text-light">
      <Row>
        <Col
          sm={sidebarProfile ? 10 : 12}
          className={sidebarProfile ? "p-0" : ""}
        >
          <ColorSchemesExample
            SidebarProfile={() => openSidebatProfile()}
            item={item}
          />
          <h1>Keranjang</h1>
          <Container className="mt-2">
            <table className="table table-light table-striped mt-2 border border-dark">
              <thead>
                <tr>
                  <td>No</td>
                  <td>Produk</td>
                  <td>Harga</td>
                  <td>Jumlah</td>
                  <td>Aksi</td>
                </tr>
              </thead>
              {item.map((value, index) => {
                // <Cart barang={jumlahBarang} />
                return (
                  <tbody>
                    <tr>
                      <td key={value.id}  name="item">{value.id}</td>
                      <td className="w-50">{value.product_name}</td>
                      <td>${value.product_price}</td>
                      <td>{value.product_quantityStock}</td>
                      <td>
                        <div className="d-flex justify-content-around">
                          <button
                            className="bg-danger text-light border border-danger rounded w-25"
                            onClick={() =>
                              setState((prev) => ({
                                ...prev,
                                count: prev.count - 1,
                              }))
                            }
                          >
                            -
                          </button>
                          <button
                            className="bg-success text-light border border-success rounded w-25"
                            onClick={increment}
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </Container>
        </Col>
        <Col
          sm={sidebarProfile ? 2 : 0}
          className={
            sidebarProfile
              ? "animate__fadeInRight p-0"
              : "animate__fadeOutRight"
          }
        >
          {sidebarProfile && (
            <FillExample SidebarProfile={() => closeSidebarProfile()} />
          )}
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default Cart;
