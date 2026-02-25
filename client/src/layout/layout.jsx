import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useLocation } from "react-router-dom";

function Layout() {
  const [loggedInMember, setLoggedInMember] = useState("");
  const location = useLocation();

  useEffect(() => {
    setLoggedInMember(localStorage.getItem("agentID") || "Guest");
  }, [location]);

  return (
    <>
      <header>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>Riddlers Assylum</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/assylumlogs">
                Assylum
              </Nav.Link>
            </Nav>
            <Navbar.Text className="me-2">Welcome {loggedInMember}</Navbar.Text>
            <Nav>
              <Nav.Link
                onClick={() => {
                  localStorage.removeItem("agentID");
                  localStorage.removeItem("userID");
                  window.location.href = "/";
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p> &copy; 2026 Riddlers Assylum</p>
      </footer>
    </>
  );
}

export default Layout;
