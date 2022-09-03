import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = props => {

  return (
    <Nav defaultActiveKey="/home">
      <Nav.Item>
        <Link role="button" className="nav-link" to="/">Home</Link>
      </Nav.Item>
      <Nav.Item>
        <Link role="button" className="nav-link" to="/documents">Docs</Link>
      </Nav.Item>
      <Nav.Item>
        <Link role="button" className="nav-link" to="/about">About</Link>
      </Nav.Item>
      <Nav.Item>
        <Link role="button" className="nav-link" to="/upload">Upload</Link>
      </Nav.Item>
      <Nav.Item>
        <Link role="button" className="nav-link" to="/login">Login</Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navigation;