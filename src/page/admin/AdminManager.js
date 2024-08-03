import React, { useState } from "react";
import { Alert, Button, Col, Container, Nav, Row } from "react-bootstrap";
import "../../style/scroll.css";
import "../../style/lightEffect.css";
import LogoAcmeO2 from "../../img/AcmeO2.svg";
import Users from "./Users";
import Products from "./Products";
import Orders from "./Orders";
import Dashboard from "./Dashboard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";

function AdminManager({ item, orders = [] }) {
  const location = useLocation();
  const updateProductTrue = location.state?.updateProductTrue;
  // console.log("cek update true/false :", updateProductTrue);

  let navigate = useNavigate();
  const sessionData = sessionStorage.getItem("user");
  const [userLogin, setUserLogin] = React.useState();
  const parseData = JSON.parse(sessionData);
  React.useEffect(() => {
    if (sessionData === null) {
      // console.log(sessionData);
    } else {
      var decoded = jwt_decode(parseData?.token);
      // console.log(userLogin);
      setUserLogin(decoded?.results[0]);
    }
  }, [sessionData]);

  React.useEffect(() => {
    if (parseData?.r === "admin") {
      console.log("akun admin");
    } else {
      console.log("akun user");
      navigate("/");
    }
  });
  // kondisi pengecekan role BELUM KELAR

  // get users
  const [users, setUsers] = useState([]);
  React.useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    await axios
      .get("https://api.acmeo2.online/user")
      .then(function (response) {
        // handle success
        // console.log(response);
        setUsers(response.data.data);
      })
      .catch((err) => console.log(err));
  };
  // get users
  const [updateProductcheck, setUpdateProductCheck] =
    useState(updateProductTrue);
  const [show, setShow] = useState();
  const [dashboard, setDashboard] = useState(true);
  const openDashboard = () => {
    setDashboard(true);
    setProduct(false);
    setUser(false);
    setOrder(false);
    setAddProduct(false);
    setUpdateProduct(false);
  };
  const [product, setProduct] = useState(false);
  const openProduct = () => {
    setProduct(true);
    setDashboard(false);
    setUser(false);
    setOrder(false);
    setAddProduct(false);
    setUpdateProduct(false);
  };
  const [user, setUser] = useState(false);
  const openUser = () => {
    setUser(true);
    setDashboard(false);
    setProduct(false);
    setOrder(false);
    setAddProduct(false);
    setUpdateProduct(false);
  };
  const [order, setOrder] = useState(false);
  const openOrder = () => {
    setOrder(true);
    setUser(false);
    setDashboard(false);
    setProduct(false);
    setAddProduct(false);
    setUpdateProduct(false);
  };
  const [addProduct, setAddProduct] = useState(false);
  const openAddProduct = () => {
    setAddProduct(true);
    setUser(false);
    setDashboard(false);
    setProduct(false);
    setUpdateProduct(false);
  };
  const [updateProduct, setUpdateProduct] = useState(false);
  const openUpdateProduct = () => {
    setUpdateProduct(true);
    setUser(false);
    setDashboard(false);
    setProduct(false);
    setAddProduct(false);
  };
  const changeShow = () => {
    setShow(false);
    setUpdateProductCheck(false);
  };
  React.useEffect(() => {
    if (updateProductcheck === true) {
      setProduct(true);
      setShow(true);
      setDashboard(false);
      setUser(false);
      setOrder(false);
      setAddProduct(false);
      setUpdateProduct(false);
    }
  }, [item]);

  return (
    <Container fluid className="bg-dark text-light">
      {updateProductcheck === true ? (
        <>
          <Alert
            className="position-absolute top-0 start-50 translate-middle-x mt-2"
            style={{ zIndex: "1" }}
            show={show}
            variant="success"
          >
            <Alert.Heading>Memperbarui Produk Berhasil</Alert.Heading>

            <div className="d-flex justify-content-end">
              <Button onClick={() => changeShow()} variant="outline-success">
                Close me
              </Button>
            </div>
          </Alert>
        </>
      ) : (
        ""
      )}
      <Row
        className={updateProductcheck === true ? "mb-2 opacity-50" : "mb-2"}
        style={{ zIndex: "2" }}
      >
        <Col sm="2" className="p-0">
          <div className="bg-light overflow-hidden text-dark h-100">
            <Row className="justify-content-center mt-2 mb-2">
              <img
                className="w-100 mb-2 broken-light"
                src={LogoAcmeO2}
                alt="ImageUser"
                type="button"
                onClick={() => {
                  navigate("/");
                }}
              />
              <div>
                <h5>{userLogin?.user_username}</h5>
              </div>
            </Row>
            <Row className="mt-2 border-top border-light">
              <Nav.Link
                style={{ height: "4rem" }}
                className={dashboard ? "btn active mt-1" : "btn mt-1"}
                id="profile"
                onClick={() => openDashboard()}
              >
                <p className="position-relative top-50 start-50 translate-middle">
                  Dashboard
                </p>
              </Nav.Link>
              <Nav.Link
                style={{ height: "4rem" }}
                className={product ? "btn active" : "btn"}
                id="products"
                onClick={() => openProduct()}
              >
                <p className="position-relative top-50 start-50 translate-middle">
                  Products
                </p>
              </Nav.Link>
              <Nav.Link
                style={{ height: "4rem" }}
                className={user ? "btn active" : "btn"}
                id="user"
                onClick={() => openUser()}
              >
                <p className="position-relative top-50 start-50 translate-middle">
                  User
                </p>
              </Nav.Link>
              <Nav.Link
                style={{ height: "4rem" }}
                className={order ? "btn active" : "btn"}
                id="order"
                onClick={() => openOrder()}
              >
                <p className="position-relative top-50 start-50 translate-middle">
                  Orders
                </p>
              </Nav.Link>
              <Nav.Link style={{ height: "4rem" }} className="btn border mt-5">
                <Link
                  to="/Logout"
                  className="text-light"
                  style={{ textDecoration: "none" }}
                >
                  <p className="position-relative top-50 start-50 translate-middle">
                    Logout
                  </p>
                </Link>
              </Nav.Link>
            </Row>
          </div>
        </Col>

        <Col sm="10" className="mb-2">
          <h1 className="fw-semibold">Admin Manager</h1>
          {product ? (
            <Row className="justify-content-center">
              <Nav.Link
                style={{ height: "3rem" }}
                className="btn btn-primary mt-1 w-100"
                id="profile"
                onClick={() => openAddProduct()}
              >
                <h2 className="text-light fw-bold">Tambah Produk</h2>
              </Nav.Link>
            </Row>
          ) : (
            ""
          )}
          <Col
            style={{ height: "50rem" }}
            className="overflow-auto scroll bg-light text-dark rounded"
          >
            {/* Content */}
            {dashboard ? <Dashboard item={item} /> : ""}
            {user ? <Users users={users} /> : ""}
            {product ? <Products item={item} /> : ""}
            {addProduct ? <AddProduct item={item} /> : ""}
            {updateProduct ? (
              <UpdateProduct openUpdateProduct={openUpdateProduct()} />
            ) : (
              ""
            )}
            {order ? <Orders /> : ""}
            {/* Content */}
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminManager;
