import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Row,
  Stack,
} from "react-bootstrap";
import AddWishlist from "./AddWishlist";
import ComingSoon from "./ComingSoon";

function Jacket({ unique = [], wishlist = [] }) {
  const userLogin = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);

  var productjacket = unique.filter(function (el) {
    return el.product_category === "Jacket";
  });

  var user = userLogin?.user_uuid
  const uniqueUserFilter = []
  const uniqueUser = wishlist.filter(element => {
    if (element.wishlist_userUUID === user) {
      uniqueUserFilter.push(element.wishlist_userUUID);
      return true;
    }
    return false;
  });
  // console.log(uniqueUser);

  useEffect(() => {
    if (unique.length !== 0) {
      // console.log(`unique`, unique);

      const itemWishlist = [];
      console.log("product UUID wishlist", itemWishlist);
      const findWishList = productjacket.filter((product) =>
      uniqueUser.find(
          (wish) => wish?.wishlist_productUUID === product?.product_uuid
        )
      );
      // console.log(`findWishList`, findWishList);
      // itemWishlist.push(value.product_uuid);
      
      // console.log(`wishlist `, uniqueUser);
      findWishList.map((value) => {
        return itemWishlist.push(value.product_uuid);
      });

      console.log('wishlist UUID', itemWishlist);

      setProducts(() => {
        const products = productjacket.map((product) => {
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
  }, [unique]);

  const sortedDataProduct = products.map(item => {
    return {
      ...item,
      sortableDate: new Date(item.create_at).getTime()
    };
  }).sort((a, b) => {
    return a.sortableDate - b.sortableDate;
  });

  // console.log(`products`, sortedDataProduct);
  // console.log(`wishlist`, wishlist);
console.log('produk celana :', productjacket);
  return (
    <>
      {productjacket.length ? (
        <Container>
          <Stack direction="vertical" gap={3}>
            <div>
              <Row className="text-dark mb-4">
                {sortedDataProduct.map((value, index) => {
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
                            "Some quick example text to build on the card title
                            and make up the bulk of the card's content."
                          </Card.Text>
                          <Row>
                            <Col>
                              <Button
                                variant="secondary"
                                href={`./DetailProduct/${value?.product_uuid}`}
                              >
                                Detail Product
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
      ) : (
        <ComingSoon />

      )}
    </>
  );
}
export default Jacket;
