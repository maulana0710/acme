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
import { Link } from "react-router-dom";

function Pants({ unique = [], wishlist = [] }) {
  const userLogin = JSON.parse(sessionStorage.getItem("user"));
  const [products, setProducts] = useState([]);

  var productPants = unique.filter(function (el) {
    return el.product_category === "Pants";
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
      const findWishList = productPants.filter((product) =>
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

      setProducts(() => {
        const products = productPants.map((product) => {
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
  return (
    <>
      {productPants.length ? (
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
      ) : (
        <ComingSoon />
      )}
    </>
  );
}
export default Pants;
