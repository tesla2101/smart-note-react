import { useContext } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AuthContext from "../../context/auth-context";
import { getCurrentUser } from "../../services/AuthService";
import LogoutIcon from '@mui/icons-material/Logout';

export const NavigationBar = () => {
  const ctx = useContext(AuthContext);
  let user = null;
  if (ctx.isLoggedIn) {
    user = getCurrentUser();
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">SmartNote</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {ctx.isLoggedIn ? (
              <NavDropdown title={user.firstName}>
                <NavDropdown.Item>
                  {user.email}
                </NavDropdown.Item>
                <NavDropdown.Item href="/profile">User Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/login" onClick={ctx.onLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>
          {ctx.isLoggedIn ? (
            <Nav className="me-left">
              <Nav.Link href="/login" onClick={ctx.onLogout}>
              <LogoutIcon></LogoutIcon>
                Logout
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">SignUp</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
