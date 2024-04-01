import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [expanded, setExpanded] = useState([]);

  //handle toggle self-closing

  const handleNavBarClick = () => {
    setExpanded(true);
  };

  return (
    <Navbar
      expanded={!expanded}
      className="navbar"
      bg="light"
      sticky="top"
      expand="lg"
    >
      <Navbar.Brand
        as={Link}
        to={"/"}
        className="text-center text-success fs-2 my-3"
      >
        PuppyBowl
      </Navbar.Brand>
      <Navbar.Toggle onClick={() => setExpanded(!expanded)} />
      <Navbar.Collapse>
        <Nav className=" nav-bar ml-auto gap-3">
          <Nav.Link onClick={handleNavBarClick} as={Link} to="/players">
            Players
          </Nav.Link>
          <Nav.Link onClick={handleNavBarClick} as={Link} to="/add-players">
            Add Players
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
