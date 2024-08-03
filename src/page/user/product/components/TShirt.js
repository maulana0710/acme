import React, { useState, useEffect } from "react";
import {
  Alert,
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
import { FcLikePlaceholder } from "react-icons/fc";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

function TShirt({ unique = [], wishlist = [], cart = [] }) {
  const sessionData = sessionStorage.getItem("user");
  const user = JSON.parse(sessionData);
  const [userLogin, setUserLogin] = React.useState();
  React.useEffect(() => {
    if (sessionData === null) {
      // console.log(sessionData);
    }else{
      const parseData = JSON.parse(sessionData);
      var decoded = jwt_decode(parseData?.token);
      // console.log(userLogin);
      setUserLogin(decoded?.results[0]);
      
    }
  }, [sessionData])

  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);

  var productTShirt = unique.filter(function (el) {
    return el.product_category === "T-Shirt";
  });

  var userId = userLogin?.user_uuid;
  const uniqueUserFilter = [];
  const uniqueUser = wishlist.filter((element) => {
    if (element.wishlist_userUUID === userId) {
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
      // console.log("product UUID wishlist", itemWishlist);
      const findWishList = productTShirt.filter((product) =>
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

      // console.log("wishlist UUID", itemWishlist);

      setProducts(() => {
        const products = productTShirt.map((product) => {
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

  const sortedDataProduct = products
    .map((item) => {
      return {
        ...item,
        sortableDate: new Date(item.create_at).getTime(),
      };
    })
    .sort((a, b) => {
      return a.sortableDate - b.sortableDate;
    });

  return (
    <>
      {productTShirt.length ? (
        <Container>
          <Alert className="mt-4" show={show} variant="danger">
            <Alert.Heading>Please Login First!</Alert.Heading>
            <p>
              Amet deserunt qui consectetur veniam minim. Consectetur ut sit eu
              reprehenderit aliquip et veniam officia. Aliquip aliqua commodo
              nisi consectetur ex aliquip id veniam culpa fugiat aliqua aliquip.
              Incididunt nostrud aute laboris pariatur id cillum ex deserunt
              nisi aute. Enim ut nostrud adipisicing nostrud officia dolore
              eiusmod veniam aute officia adipisicing. Non amet officia sunt id
              ad cupidatat eu proident enim. Esse consequat proident elit duis
              adipisicing enim sunt cillum duis tempor aliqua proident aliqua.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShow(false)} variant="outline-danger">
                Close me
              </Button>
            </div>
          </Alert>
          <Stack direction="vertical" gap={3}>
            <div>
              <Row className="text-dark mb-4">
                {sortedDataProduct.map((value, index) => {
                  return (
                    <Col key={index} className="mt-4">
                      <Card style={{ width: "100%", maxWidth: "18rem" }}>
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
                            "Eu nostrud enim ipsum commodo laboris laboris
                            dolore id cillum elit aliqua. Reprehenderit in minim
                            exercitation veniam anim aute. Nostrud adipisicing
                            incididunt aute quis deserunt do Lorem do aliqua
                            incididunt aute quis adipisicing commodo. Lorem aute
                            do nisi sit ad sit nulla fugiat fugiat esse. Veniam
                            Lorem consequat reprehenderit velit."
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
                              {user?.success === true ? (
                                <AddWishlist
                                  wishlistFeature={value}
                                  wishlist={wishlist}
                                  wishlistId={value?.product_uuid}
                                  isWishList={value.isWishList}
                                  allItemWishlist={uniqueUser}
                                  userID={userId}
                                />
                              ) : (
                                <>
                                  {!show && (
                                    <FcLikePlaceholder
                                      type="button"
                                      onClick={(e) => setShow(e)}
                                    />
                                  )}
                                </>
                              )}
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
export default TShirt;
