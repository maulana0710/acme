import { useState } from "react";
import {
  Col,
  Nav,
  Row
} from "react-bootstrap";
import AcmeO2 from "../../../img/AcmeO2.svg";
import Accessories from "./components/Accessories";
import Jacket from "./components/Jacket";
import Pants from "./components/Pants";
import TShirt from "./components/TShirt";



function AllProduct({item = [], wishlist}) {
  // console.log(item);
  const uniqueName = [];
  const unique = item.filter((element) => {
    const isDuplicate = uniqueName.includes(element.product_name);

    if (!isDuplicate) {
      uniqueName.push(element.product_name);
      return true;
    }
    return false;
  });

  const [tShirt, setTShirt] = useState(true);
  const openTShirt = () => {
    setTShirt(true);
    setPants(false);
    setJacket(false);
    setAccessories(false);
  };
  const [pants, setPants] = useState(false);
  const openPants = () => {
    setPants(true);
    setTShirt(false);
    setJacket(false);
    setAccessories(false);
  };
  const [jacket, setJacket] = useState(false);
  const openJacket = () => {
    setJacket(true);
    setTShirt(false);
    setPants(false);
    setAccessories(false);
  };
  const [accessories, setAccessories] = useState(false);
  const openAccessories = () => {
    setAccessories(true);
    setJacket(false);
    setTShirt(false);
    setPants(false);
  };

  return (
    <div className="bg-dark text-light">
      <Row className="bg-light m-4 rounded">
        <Col sm='2'>
        <div className="bg-light overflow-hidden text-dark h-100 border-end border-4">
            <Row className="justify-content-center mt-2 mb-2">
              <img
                className="w-100 mb-2 broken-light"
                src={AcmeO2}
                alt="ImageUser"
              />
              <div>
                <h5 className="fw-bolder">PRODUCT</h5>
              </div>
            </Row>
            <Row className="mt-2 border-top border-light">
              <Nav.Link
              style={{ height:'4rem' }}
                className={tShirt ? "btn active mt-1" : 'btn mt-1'}
                id="profile"
                onClick={() => openTShirt()}
              >
               <p className="position-relative top-50 start-50 translate-middle">
                T-Shirt
                </p> 
              </Nav.Link>
              <Nav.Link
               style={{ height:'4rem' }}
                className={pants ? "btn active" : 'btn'}
                id="products"
                onClick={() => openPants()}
              >
                <p className="position-relative top-50 start-50 translate-middle">
                Pants
                </p>
              </Nav.Link>
              <Nav.Link style={{ height:'4rem' }} className={jacket ? "btn active" : 'btn'} id="user" onClick={() => openJacket()}>
              <p className="position-relative top-50 start-50 translate-middle">
                Jacket
                </p>
              </Nav.Link>
              <Nav.Link style={{ height:'4rem' }} className={accessories ? "btn active" : 'btn'} id="order" onClick={() => openAccessories()}>
              <p className="position-relative top-50 start-50 translate-middle">
              Accessories</p>
              </Nav.Link>
            </Row>
          </div>
        </Col>
        <Col sm='10' className="h-auto align-self-center">
            {tShirt ? <TShirt unique={unique} wishlist={wishlist}/> : ""}
            {pants ? <Pants unique={unique} wishlist={wishlist}/> : ""}
            {jacket ? <Jacket unique={unique} wishlist={wishlist}/> : ""}
            {accessories ? <Accessories unique={unique} wishlist={wishlist}/> : ""}
        </Col>
      </Row>
    </div>
  );
}
export default AllProduct;
