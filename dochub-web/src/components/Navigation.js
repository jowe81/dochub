import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useOutletContext } from "react-router-dom";

const Navigation = () => {

  const appData = useOutletContext();

  return (
    <Nav defaultActiveKey="/home">
      <Nav.Item>
        <Link role="button" className="nav-link" to="/documents">Docs</Link>
      </Nav.Item>
      <Nav.Item>
        <Link role="button" className="nav-link" to="/about">About</Link>
      </Nav.Item>
      { appData?.isLoggedIn &&
      <Nav.Item>
        <Link role="button" className="nav-link" to="/upload">Upload</Link>
      </Nav.Item>
      }
      { !appData?.isLoggedIn &&
      <Nav.Item>
        <Link role="button" className="nav-link" to="/login">Login</Link>
      </Nav.Item>    
      }
      { appData?.isLoggedIn &&
      <>
        <Nav.Item>
          <Link role="button" className="nav-link" to="/logout">Logout</Link>
        </Nav.Item>    
        <Nav.Item>
          <Link role="button" className="nav-link" to="/settings">Settings</Link>
        </Nav.Item>    
        <Nav.Item className="my-auto text-secondary">
            {appData.user.email}
        </Nav.Item>
      </>

      }
    </Nav>
  );
}

export default Navigation;