import React, { useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import "../../style/scroll.css";
import "../../style/lightEffect.css";
import LogoAcmeO2 from "../../img/AcmeO2.svg";
import Users from "./Users";
import Products from "./Products";
import Orders from "./Orders";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

function AdminManager({item, users}) {
  let navigate = useNavigate();
  const userLogin = JSON.parse(localStorage.getItem("user"));
  React.useEffect(() => {
    if (userLogin.user_role === 'admin') {
  
    } else {
      navigate("/");
    }
      });
  const [dashboard, setDashboard] = useState(true);
  const openDashboard = () => {
    setDashboard(true);
    setProduct(false);
    setUser(false);
    setOrder(false);
  };
  const [product, setProduct] = useState(false);
  const openProduct = () => {
    setProduct(true);
    setDashboard(false);
    setUser(false);
    setOrder(false);
  };
  const [user, setUser] = useState(false);
  const openUser = () => {
    setUser(true);
    setDashboard(false);
    setProduct(false);
    setOrder(false);
  };
  const [order, setOrder] = useState(false);
  const openOrder = () => {
    setOrder(true);
    setUser(false);
    setDashboard(false);
    setProduct(false);
  };

  return (
    <Container fluid className="bg-dark text-light">
      <Row className="mb-2">
        <Col sm="2" className="p-0">
          <div className="bg-light overflow-hidden text-dark h-100">
            <Row className="justify-content-center mt-2 mb-2">
              <img
                className="w-100 mb-2 broken-light"
                src={LogoAcmeO2}
                alt="ImageUser"
                /> 
              <div>
                <h5>{userLogin.user_username}</h5>
              </div>
            </Row>
            <Row className="mt-2 border-top border-light">
              <Nav.Link
              style={{ height:'4rem' }}
                className={dashboard ? "btn active mt-1" : 'btn mt-1'}
                id="profile"
                onClick={() => openDashboard()}
              >
               <p className="position-relative top-50 start-50 translate-middle">
                Dashboard
                </p> 
              </Nav.Link>
              <Nav.Link
               style={{ height:'4rem' }}
                className={product ? "btn active" : 'btn'}
                id="products"
                onClick={() => openProduct()}
              >
                <p className="position-relative top-50 start-50 translate-middle">
                Products
                </p>
              </Nav.Link>
              <Nav.Link style={{ height:'4rem' }} className={user ? "btn active" : 'btn'} id="user" onClick={() => openUser()}>
              <p className="position-relative top-50 start-50 translate-middle">
                User
                </p>
              </Nav.Link>
              <Nav.Link style={{ height:'4rem' }} className={order ? "btn active" : 'btn'} id="order" onClick={() => openOrder()}>
              <p className="position-relative top-50 start-50 translate-middle">
                Orders</p>
              </Nav.Link>
              <Nav.Link style={{ height:'4rem' }} className="btn border mt-5" href="/Logout">
              <p className="position-relative top-50 start-50 translate-middle">
                Logout</p>
              </Nav.Link>
            </Row>
          </div>
        </Col>

        <Col sm="10" className="mb-2">
          <h1 className="fw-semibold">Admin Manager</h1>
          <Col
            style={{ height: "50rem" }}
            className="overflow-auto scroll bg-light text-dark rounded"
          >
            {/* Content */}
            {dashboard ? <Dashboard /> : ""}
            {user ? <Users users={users}/> : ""}
            {product ? <Products item={item}/> : ""}
            {order ? <Orders /> : ""}
            {/* Content */}
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminManager;
