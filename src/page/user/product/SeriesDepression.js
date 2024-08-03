import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Container,
  Stack,
  Carousel,
} from "react-bootstrap";
import Footer from "../components/Footer";
import ColorSchemesExample from "../components/NavigationBar";
import FillExample from "../components/SidebarProfile";
import AddWishlist from "./components/AddWishlist";
import { Link } from "react-router-dom";

function ProductSeriesDepression({ item = [], wishlist = [], cart = [] }) {
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

  var items = item.filter(function (el) {
    return el.product_series === "Depression";
  });

  const uniqueName = [];
  // console.log('unikName', uniqueName);
  const unique = items.filter((element) => {
    // console.log('name',uniqueName);
    const isDuplicate = uniqueName.includes(element.product_name);
    if (!isDuplicate) {
      uniqueName.push(element.product_name);
      return true;
    }
    return false;
  });
  const userLogin = JSON.parse(sessionStorage.getItem("user"));
  const [products, setProducts] = useState([]);

  var user = userLogin?.user_uuid;
  const uniqueUserFilter = [];
  const uniqueUser = wishlist.filter((element) => {
    if (element.wishlist_userUUID === user) {
      uniqueUserFilter.push(element.wishlist_userUUID);
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (unique.length !== 0) {
      const itemWishlist = [];
      // console.log("product UUID wishlist", itemWishlist);
      const findWishList = unique.filter((product) =>
        uniqueUser.find(
          (wish) => wish?.wishlist_productUUID === product?.product_uuid
        )
      );

      findWishList.map((value) => {
        return itemWishlist.push(value.product_uuid);
      });

      // console.log("wishlist UUID", itemWishlist);

      setProducts(() => {
        const products = unique.map((product) => {
          if (itemWishlist.includes(product?.product_uuid)) {
            return {
              ...product,
              isWishList: true,
            };
          } else {
            return { ...product };
          }
        });
        return products;
      });
    }
  }, [item]);

  return (
    <div className={
      sidebarProfile ? "bg-dark overflow-hidden text-light" : "bg-dark overflow-hidden text-light"}>
      <Row onClick={closeMCart}>
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
            activeSd={true}
          />
          <h1>Series Depression</h1>
          <Container>
            <Stack direction="vertical" gap={3}>
              <div className={mCart || sidebarProfile ? "opacity-50" : ""}>
                <Row className="text-dark mb-4">
                  {products.map((value, index) => {
                    return (
                      <Col xs={6} md={4} key={index} className="mt-4">
                        <Card style={{ width: "100%", maxWidth: '18rem' }}>
                          <Carousel variant="dark" controls={false}>
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                style={
                                  value?.product_imageUrl1 === "undefined"
                                    ? { height: "22rem" }
                                    : {}
                                }
                                src={value?.product_imageUrl1}
                                alt="First slide"
                              />
                            </Carousel.Item>
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                style={
                                  value?.product_imageUrl2 === "undefined"
                                    ? { height: "22rem" }
                                    : {}
                                }
                                src={value?.product_imageUrl2}
                                alt="Second slide"
                              />
                            </Carousel.Item>
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                style={
                                  value?.product_imageUrl3 === "undefined"
                                    ? { height: "22rem" }
                                    : {}
                                }
                                src={value?.product_imageUrl3}
                                alt="Third slide"
                              />
                            </Carousel.Item>
                          </Carousel>
                          <Card.Body>
                            <Card.Title className="fw-bold">
                              {value?.product_name}
                            </Card.Title>
                            <Card.Text>
                              "Some quick example text to build on the card
                              title and make up the bulk of the card's content."
                            </Card.Text>
                            <Row>
                              <Col>
                                <Button
                                  variant="secondary"
                                >
                                  <Link
                        to={`./DetailProduct/${value?.product_uuid}`}
                        className="text-light"
                        style={{ textDecoration: "none" }}
                      >

                                  Detail Product
                      </Link>
                                </Button>
                              </Col>
                              <Col>
                                <AddWishlist
                                  wishlistFeature={value}
                                  wishlist={wishlist}
                                  wishlistId={value?.product_uuid}
                                  isWishList={value.isWishList}
                                  allItemWishlist={uniqueUser}
                                />
                              </Col>
                            </Row>
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

export default ProductSeriesDepression;
