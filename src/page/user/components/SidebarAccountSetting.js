import { Nav, Row } from "react-bootstrap";

function SidebarAccountSetting() {
    // const userLogin = JSON.parse(localStorage.getItem("user"));
    
    return (
      <>
        <Row className="mt-2">
          <Nav.Link className="btn" href="/AccountSetting">
            Profile
          </Nav.Link>
          <Nav.Link className="btn" href="/Password">
            Password
          </Nav.Link>
          <Nav.Link className="btn" href="#/Wishlist">
            Wishlist
          </Nav.Link>
          <Nav.Link className="btn" href="#/Payment">
            Payment
          </Nav.Link>
          <Nav.Link className="btn" href="#/Help">
            Help
          </Nav.Link>
          <Nav.Link className="btn" href="/Logout">
            Logout
          </Nav.Link>
        </Row>
      </>
    );
  }
  export default SidebarAccountSetting;