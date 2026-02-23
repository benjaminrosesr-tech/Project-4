import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>Happy Wife</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Honey Doo
              </Nav.Link>
              <Nav.Link as={Link} to="/Contact">
                Contact
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p> &copy; 2026 Happy Wife</p>
      </footer>
    </>
  );
}

export default Layout;
