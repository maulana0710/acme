import * as React from "react";
import axios from "axios";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Card, Container, Button, Col, Row } from "react-bootstrap";
import "./App.css";
import "./style/fadeEffect.css";
import "./style/lightEffect.css";
import "./style/removeFocusFormCheckInput.css";

// user
import ColorSchemesExample from "./page/user/components/NavigationBar";
import ProductSeriesDepression from "./page/user/product/SeriesDepression";
import ProductSeriesHappiness from "./page/user/product/SeriesHappiness";
import CarouselFadeProduct from "./page/user/Corousel";
import Footer from "./page/user/components/Footer";
import BasicExample from "./page/auth/Login";
import UserContext from "./page/user/Context";
import Progress from "./page/user/components/Progress";
import Cart from "./page/user/Cart";
import MiniCart from "./page/user/components/MiniCart";
import RemoveCartItem from "./page/user/RemoveCartItem";
import StoreItemCartUser from "./page/user/StoreItemCartUser";
import FillExample from "./page/user/components/SidebarProfile";
import Logout from "./page/auth/Logout";
import SignUp from "./page/user/SignUp";
import ListTransaction from "./page/user/profile/components/ListTransaction";
import PreviewHome from "./page/user/PreviewHome";
import AccountSetting from "./page/user/profile/AccountSetting";
import Wishlist from "./page/user/product/Wishlist";
import DetailProduct from "./page/user/product/DetailProduct";
import ProductSizeS from "./page/user/product/components/ProductSizeS";
import ProductSizeM from "./page/user/product/components/ProductSizeM";
import ProductSizeL from "./page/user/product/components/ProductSizeL";
import ProductSizeXL from "./page/user/product/components/ProductSizeXL";
// user
// admin
import AdminManager from "./page/admin/AdminManager";
import Dashboard from "./page/admin/Dashboard";
import Users from "./page/admin/Users";
import Products from "./page/admin/Products";
import Orders from "./page/admin/Orders";
import UpdateProduct from "./page/admin/UpdateProduct";
import AllProduct from "./page/user/product/AllProduct";
import TShirt from "./page/user/product/components/TShirt";
import Pants from "./page/user/product/components/Pants";
import Jacket from "./page/user/product/components/Jacket";
import Accessories from "./page/user/product/components/Accessories";
import ForgotPassword from "./page/user/ForgotPassword";
import PurchaseConfirmation from "./page/user/PurchaseConfirmation";
import Purchasing from "./page/user/Purchasing";
// admin

function App() {
  const [itemProducts, setItemProducts] = useState([]);
  React.useEffect(() => {
    getItemProducts();
  }, []);
  const getItemProducts = async () => {
    await axios
      .get("http://localhost:8080/product")
      .then(function (response) {
        // handle success
        // console.log(response);
        setItemProducts(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  const [wishlistProduct, setWishlistProduct] = useState([]);
  React.useEffect(() => {
    getWishlistProduct();
  }, []);
  const getWishlistProduct = async () => {
    await axios
      .get("http://localhost:8080/wishlist")
      .then(function (response) {
        // handle success
        // console.log(response);
        setWishlistProduct(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  const [cartProduct, setCartProduct] = useState([]);
  React.useEffect(() => {
    getCartProduct();
  }, []);
  const getCartProduct = async () => {
    await axios
      .get("http://localhost:8080/cart")
      .then(function (response) {
        // handle success
        // console.log(response);
        setCartProduct(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App font-source-sans-pro" style={{ overflowX: "hidden" }}>
      <Routes>
        <Route
          path="/"
          element={
            <Index
              item={itemProducts}
              wishlist={wishlistProduct}
              cart={cartProduct}
            />
          }
        />
        <Route path="/App" element={<App />} />
        <Route path="/Login" element={<BasicExample />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />

        {/* Product Page */}
        <Route
          path="/SeriesDepression"
          element={
            <ProductSeriesDepression
              item={itemProducts}
              wishlist={wishlistProduct}
              cart={cartProduct}
            />
          }
        />
        <Route
          path="/SeriesHappiness"
          element={
            <ProductSeriesHappiness
              item={itemProducts}
              wishlist={wishlistProduct}
              cart={cartProduct}
            />
          }
        />
        <Route path="/AllProduct" element={<AllProduct />} />
        <Route
          path="/DetailProduct/:uuidProduct"
          element={<DetailProduct item={itemProducts} cart={cartProduct} />}
        />
        <Route path="/ProductSizeS/:uuidProduct" element={<ProductSizeS />} />
        <Route path="/ProductSizeM/:uuidProduct" element={<ProductSizeM />} />
        <Route path="/ProductSizeL/:uuidProduct" element={<ProductSizeL />} />
        <Route path="/ProductSizeXL/:uuidProduct" element={<ProductSizeXL />} />
        {/* Product Page */}

        {/* Detail Product */}
        <Route path="/TShirt" element={<TShirt />} />
        <Route path="/Pants" element={<Pants />} />
        <Route path="/Jacket" element={<Jacket />} />
        <Route path="/Accessories" element={<Accessories />} />
        {/* Detail Product */}

        {/* Index */}
        <Route path="/PreviewHome" element={<PreviewHome />} />
        <Route path="/Corousel" element={<CarouselFadeProduct />} />
        {/* Index */}

        {/* Navigation */}
        <Route path="/NavigationBar" element={<ColorSchemesExample />} />
        <Route
          path="/AccountSetting"
          element={<AccountSetting item={itemProducts} />}
        />
        <Route path="/SidebarProfile" element={<FillExample />} />
        <Route path="/Context" element={<UserContext />} />
        <Route path="/Progress" element={<Progress />} />
        <Route
          path="/ListTransaction"
          element={<ListTransaction item={itemProducts} />}
        />
        <Route
          path="/Wishlist"
          element={<Wishlist item={itemProducts} wishlist={wishlistProduct} />}
        />
        <Route
          path="/Cart"
          element={<Cart item={itemProducts} cart={cartProduct} />}
        />
        <Route
          path="/PurchaseConfirmation"
          element={
            <PurchaseConfirmation item={itemProducts} cart={cartProduct} />
          }
        />
        <Route
          path="/Purchasing"
          element={<Purchasing item={itemProducts} />}
        />
        <Route path="/MiniCart" element={<MiniCart />} />
        <Route path="/RemoveCartItem" element={<RemoveCartItem />} />
        <Route
          path="/StoreItemCartUser"
          element={<StoreItemCartUser item={itemProducts} />}
        />
        <Route path="/Footer" element={<Footer />} />
        {/* Navigation */}

        {/* admin */}
        <Route
          path="/AdminManager"
          element={<AdminManager item={itemProducts} />}
        />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Products" element={<Products />} />
        <Route
          path="/UpdateProduct/:uuid"
          element={<UpdateProduct item={itemProducts} />}
        />
        <Route path="/Orders" element={<Orders />} />
        {/* admin */}
      </Routes>
    </div>
  );
}

function Index({ item, wishlist, cart }) {
  const [sidebarProfile, setSidebarProfile] = useState(false);
  const openSidebarProfile = () => {
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
  // console.log("cek mcart", mCart);
  return (
    <div
      className={
        sidebarProfile ? "bg-dark overflow-hidden" : "bg-dark overflow-hidden"
      }
    >
      <Row onClick={closeMCart}>
        {/* <Row> */}
        <Col
          sm={sidebarProfile ? 10 : 12}
          className={sidebarProfile ? "p-0" : ""}
        >
          <ColorSchemesExample
            SidebarProfile={() => openSidebarProfile()}
            item={item}
            cart={cart}
            mCart={mCart}
            openMCart={(e) => openMCart(e)}
            closeMCart={() => closeMCart()}
            activeIndex={true}
          />
          <div className={mCart || sidebarProfile ? "opacity-50" : ""}>
            <CarouselFadeProduct item={item} />
            <Container fluid>
              <Row>
                <Col>
                  <Card className="text-center mt-3 mb-3 fade-in">
                    <Card.Header>
                      Welcome To AcmeO<sup>2</sup>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Your Style, Your Choice</Card.Title>
                      <Card.Text>Two ways of emotion.</Card.Text>
                      <Button variant="dark" className="me-4 fade-in-down">
                        Dark Side
                      </Button>
                      <Button variant="light" className="ms-4 fade-in-down">
                        Ligth Side
                      </Button>
                    </Card.Body>
                  </Card>
                  <PreviewHome item={item} />
                </Col>
              </Row>
              <AllProduct item={item} wishlist={wishlist} cart={cart} />
            </Container>
          </div>
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

export default App;
