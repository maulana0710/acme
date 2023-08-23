import { Col, Row, CloseButton, Nav } from "react-bootstrap";
import jwt_decode from 'jwt-decode';
import React from "react";

function FillExample({ SidebarProfile }) {
  const sessionData = sessionStorage.getItem("user");
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

  return (
    <div className="sticky-top bg-light overflow-hidden border border-start-1 text-dark">
      <Row>
        <Col>
          <div className="position-relative top-50 start-50 translate-middle ">
            <h2>Menu</h2>
          </div>
        </Col>
        <Col>
          <div className="position-relative top-50 start-50 translate-middle ">
            <CloseButton onClick={SidebarProfile} />
          </div>
        </Col>
      </Row>
      <Row>
        {userLogin?.user_role === 'admin' ? (
          <Nav.Link className="btn active mb-4" href="/AdminManager">
            Admin Manager
          </Nav.Link>
        ) : (
          ""
        )}
        <Nav.Link className="btn" href="/AccountSetting">
          Account Setting
        </Nav.Link>
        <Nav.Link className="btn" href="/Wishlist">
          Wishlist
        </Nav.Link>
        <Nav.Link className="btn" href="/Purchasing">
          Pembelian
        </Nav.Link>
        <Nav.Link className="btn" href="/Logout">
          Logout
        </Nav.Link>
      </Row>
    </div>
  );
}

export default FillExample;
