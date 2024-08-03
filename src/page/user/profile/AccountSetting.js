import React, { useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import ListTransaction from "./components/ListTransaction";
import ColorSchemesExample from "../components/NavigationBar";
import PasswordUser from "./components/PasswordUser";
import ProfileUser from "./components/ProfileUser";
import FillExample from "../components/SidebarProfile";
import "../../../style/scroll.css";
import jwt_decode from 'jwt-decode';
import axios from "axios";
import { Link } from "react-router-dom";

function AccountSetting({ item = [] }) {
  const sessionData = sessionStorage.getItem('user');
  const parseData = JSON.parse(sessionData);
  var decoded = jwt_decode(parseData?.token);
  const userLogin = decoded?.results[0]
  // get order
  const [order, setOrder] = useState([]);
  React.useEffect(() => {
    getOrder();
  }, []);
  const getOrder = async () => {
    await axios
      .get(`https://api.acmeo2.online/order/user/${userLogin?.user_uuid}`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setOrder(response.data.data);
      })
      .catch((err) => console.log(err));
  };
  // get order

  let acronym = userLogin.user_username.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'').toUpperCase();  
  // console.log(acronym);

  const [sidebarProfile, setSidebarProfile] = useState(false);
  const openSidebatProfile = () => {
    setSidebarProfile(true);
  };
  const closeSidebarProfile = () => {
    setSidebarProfile(false);
  };

  const [profileUser, setProfileUser] = useState(true);
  const openProfileUser = () => {
    setProfileUser(true);
    setPasswordUser(false);
    setListTransaction(false);
  };
  const [passwordUser, setPasswordUser] = useState(false);
  const openPasswordUser = () => {
    setPasswordUser(true);
    setProfileUser(false);
    setListTransaction(false);
  };
  const [listTransaction, setListTransaction] = useState(false);
  const openListTransaction = () => {
    setListTransaction(true);
    setProfileUser(false);
    setPasswordUser(false);
  };
  
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
            mCart={mCart}
            openMCart={(e) => openMCart(e)}
            closeMCart={() => closeMCart()}
            item={item}
          />
          <h1>Account Setting</h1>
          <Container className={mCart || sidebarProfile ? "opacity-50 bg-light text-dark " : "bg-light text-dark"}>
            <Row className="border mb-2">
              <Col sm="2" className="p-0">
                <div className="bg-dark overflow-hidden text-light h-100">
                  <Row className="justify-content-center mt-2 mb-2">
                    <h1 className="border rounded-circle mb-2 bg-secondary" style={{ width:'max-content', height:'max-content' }}>{acronym}</h1>
                    <div>
                      <h5>
                        {userLogin.user_username}
                      </h5>
                    </div>
                  </Row>
                  <Row className="mt-2">
                    <Nav.Link className={profileUser ? "btn active" : 'btn'} id="profile" onClick={() => openProfileUser()}>
                      Profile
                    </Nav.Link>
                    <Nav.Link className={passwordUser ? "btn active" : 'btn'} id="password" onClick={() => openPasswordUser()}>
                      Password
                    </Nav.Link>
                    <Nav.Link className={listTransaction ? "btn active" : 'btn'} id="listTransaction" onClick={() => openListTransaction()}>
                      Daftar Transaksi
                    </Nav.Link>
                    <Nav.Link className="btn border-top mt-4">
                    <Link
                        to="/Logout"
                        className="text-light"
                        style={{ textDecoration: "none" }}
                      >
                      Logout</Link>
                    </Nav.Link>
                  </Row>
                </div>
              </Col>
              <Col sm="10" style={{ height: '50rem' }} className='overflow-auto scroll'>
                {/* Content */}
                {profileUser ? <ProfileUser /> : ''}
                {passwordUser ? <PasswordUser /> : ''}
                {listTransaction ? <ListTransaction order={order}/> : ''}
              </Col>
            </Row>
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
    </div>
  );
}

export default AccountSetting;
