import React, { useState } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import Footer from "../components/Footer";
import ColorSchemesExample from "../components/NavigationBar";
import FillExample from "../components/SidebarProfile";

function Wishlist({ item = [], wishlist = [] }) {
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

  const uniqueName = [];
  // console.log('unikName', uniqueName);
  const unique = item.filter((element) => {
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

  React.useEffect(() => {
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
          <Container
            fluid
            className={
              mCart || sidebarProfile
                ? "opacity-50 bg-light text-dark "
                : "bg-light text-dark"
            }
          >
            <Stack direction="horizontal" gap={3}>
              <div>
                <Row className="text-dark">
                  {products.map((value, index) => {
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
                            <Card.Title>{value.product_name}</Card.Title>
                            <Button
                              variant="primary"
                              href={`./DetailProduct/${value?.product_uuid}`}
                            >
                              Go somewhere
                            </Button>
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
export default Wishlist;
