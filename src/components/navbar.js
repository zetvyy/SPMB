import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import spmbLogo from "../assets/img/spmb.png";
import "../styles/home.css";

function Header() {
  return (
    <Navbar expand="lg" className="navbar bg-body-light justify-content-end ">
      <Container>
        <Navbar.Brand href="/">
          <img src={spmbLogo} className="logo__spmb" alt="spmb" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end">
            <Nav.Link
              style={{ color: "#004aad", fontWeight: "bold" }}
              href="/about"
            >
              About
            </Nav.Link>
            <Nav.Link
              style={{ color: "#004aad", fontWeight: "bold" }}
              href="/faq"
            >
              FAQ
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
