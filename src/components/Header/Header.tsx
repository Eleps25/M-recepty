import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./style.css";

const Header: React.FC = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="myHeader" sticky="top">
      <Container>
        <Navbar.Brand href="/">M-Recepty</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Domů</Nav.Link>
            <Nav.Link href="/recipelist">Seznam Receptů</Nav.Link>
            <Nav.Link href="/basketpage">Nákupní košík</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
