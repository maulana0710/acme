import React, { useState } from "react";
import { Carousel, Col, Container, Nav, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import ColorSchemesExample from "../components/NavigationBar";
import FillExample from "../components/SidebarProfile";
import ProductSizeS from "./components/ProductSizeS";
import ProductSizeM from "./components/ProductSizeM";
import ProductSizeL from "./components/ProductSizeL";
import ProductSizeXL from "./components/ProductSizeXL";

function DetailProduct({ item = [], cart = [] }) {
  const { uuidProduct } = useParams();
  // console.log("uuid product =", uuidProduct);
  // console.log("item =", item);

  const [sidebarProfile, setSidebarProfile] = useState(false);
  const openSidebatProfile = () => {
    setSidebarProfile(true);
  };
  const closeSidebarProfile = () => {
    setSidebarProfile(false);
  };

  var items = item.filter(function (el) {
    return el.product_uuid === uuidProduct;
  });
  const productName = items[0]?.product_name;
  // console.log("nama produk", productName);
  const sortedDataProduct = item
    .map((item) => {
      return {
        ...item,
        sortableDate: new Date(item.create_at).getTime(),
      };
    })
    .sort((a, b) => {
      return a.sortableDate - b.sortableDate;
    });

  const [products, setProducts] = React.useState(0);
  // console.log("isi produk", products);

  const [productSizeS, setProductSizeS] = React.useState(0);
  const [productSizeM, setProductSizeM] = React.useState(0);
  const [productSizeL, setProductSizeL] = React.useState(0);
  const [productSizeXL, setProductSizeXL] = React.useState(0);

  React.useEffect(() => {
    const products = [];
    setProducts(products);
    const product = sortedDataProduct.filter((element) => {
      if (element.product_name === productName) {
        products.push(element);
        return true;
      }
      return false;
    });
    setProductSizeS(products[0]);
    setProductSizeM(products[1]);
    setProductSizeL(products[2]);
    setProductSizeXL(products[3]);
    // console.log("product uuid sort", products);
  }, [item]);

  const [productS, setProductS] = useState(true);
  const openProductS = () => {
    setProductS(true);
    setProductM(false);
    setProductL(false);
    setProductXL(false);
  };
  const [productM, setProductM] = useState(false);
  const openProductM = () => {
    setProductM(true);
    setProductS(false);
    setProductL(false);
    setProductXL(false);
  };
  const [productL, setProductL] = useState(false);
  const openProductL = () => {
    setProductL(true);
    setProductS(false);
    setProductM(false);
    setProductXL(false);
  };
  const [productXL, setProductXL] = useState(false);
  const openProductXL = () => {
    setProductXL(true);
    setProductL(false);
    setProductS(false);
    setProductM(false);
  };
  // console.log("produk", productSizeS);

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
            item={item}
            mCart={mCart}
            cart={cart}
            openMCart={(e) => openMCart(e)}
            closeMCart={() => closeMCart()}
            activeSd={true}
          />
          <Container
            className={
              mCart || sidebarProfile
                ? "opacity-50 border rounded-bottom mt-2 mb-2"
                : "border rounded-bottom mt-2 mb-2"
            }
          >
            <Row className="mt-2 mb-2">
              <Col sm={4}>
                <Carousel variant="dark" controls={true} >
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      style={
                        products[0]?.product_imageUrl1 === "undefined"
                          ? { height: "22rem" }
                          : {}
                      }
                      src={products[0]?.product_imageUrl1}
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      style={
                        products[0]?.product_imageUrl2 === "undefined"
                          ? { height: "22rem" }
                          : {}
                      }
                      src={products[0]?.product_imageUrl2}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      style={
                        products[0]?.product_imageUrl3 === "undefined"
                          ? { height: "22rem" }
                          : {}
                      }
                      src={products[0]?.product_imageUrl3}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>
              <Col sm={8} className="border-start">
                <h2 className="fw-bolder">{products[0]?.product_name}</h2>
                <Row className="mt-2 border-top border-light">
                  <Col>
                    <Nav.Link
                      className={
                        productS ? "btn active bg-light text-dark" : "btn"
                      }
                      id="productS"
                      onClick={() => openProductS()}
                    >
                      <p className="mt-3">S</p>
                    </Nav.Link>
                  </Col>
                  <Col>
                    <Nav.Link
                      className={
                        productM ? "btn active bg-light text-dark" : "btn"
                      }
                      id="productM"
                      onClick={() => openProductM()}
                    >
                      <p className="mt-3">M</p>
                    </Nav.Link>
                  </Col>
                  <Col>
                    <Nav.Link
                      className={
                        productL ? "btn active bg-light text-dark" : "btn"
                      }
                      id="productL"
                      onClick={() => openProductL()}
                    >
                      <p className="mt-3">L</p>
                    </Nav.Link>
                  </Col>
                  <Col>
                    <Nav.Link
                      className={
                        productXL ? "btn active bg-light text-dark" : "btn"
                      }
                      id="productXL"
                      onClick={() => openProductXL()}
                    >
                      <p className="mt-3">XL</p>
                    </Nav.Link>
                  </Col>
                </Row>
                <div>
                  {productS ? <ProductSizeS product={productSizeS} cart={cart}/> : ""}
                  {productM ? <ProductSizeM product={productSizeM} cart={cart}/> : ""}
                  {productL ? <ProductSizeL product={productSizeL} cart={cart}/> : ""}
                  {productXL ? <ProductSizeXL product={productSizeXL} cart={cart}/> : ""}
                </div>
              </Col>
              <Row>
                <Col className="fw-bold">Description</Col>
              </Row>
              <Row className="">
                <Col style={{ textAlign: "justify" }}>
                  {products[0]?.product_description}
                </Col>
              </Row>
            </Row>
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
        <Footer />
      </Row>
    </div>
  );
}
export default DetailProduct;
