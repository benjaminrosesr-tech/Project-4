import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import riddlerBg from "../imgs/riddlercode.jpg";
import axios from "axios";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [agentID, setagentID] = useState("");
  const [passcode, setpasscode] = useState("");
  const [email, setEmail] = useState("");

  const handleClose = () => {
    setShowModal(false);
    setIsRegistering(false);
  };
  const handleShow = () => setShowModal(true);

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    console.log("1");
    //let response = await axios.post("http://localhost:4000/login")
    //console.log ("2")
    //console.log (response)
    const endpoint = isRegistering
      ? "http://localhost:4000/user/register"
      : "http://localhost:4000/user/login";

    try {
      const response = await fetch(endpoint, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentID, passcode, email }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegistering) {
          alert("IDENTITY REGISTERED. PROCEED TO LOGIN.");
          setIsRegistering(false);
        } else {
          setIsLoggedIn(true);
          handleClose();
        }
      } else {
        alert(`ACCESS DENIED: ${data.message}`);
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("SYSTEM ERROR: UNABLE TO CONNECT TO MAINFRAME");
    }
  };

  return (
    <div className="riddler-theme">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

          .riddler-theme {
            min-height: 100vh;
            background-color: #000;
            /* Riddler Question Mark / Code Pattern */
            background-image: url(${riddlerBg});
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: #39ff14; /* Neon Green */
            font-family: 'VT323', monospace;
          }

          .riddler-overlay {
            background-color: rgba(0, 0, 0, 0.85); /* Dark overlay for readability */
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .neon-text {
            text-shadow: 0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14;
          }

          .riddler-card {
            border: 2px solid #39ff14;
            box-shadow: 0 0 15px #39ff14, inset 0 0 15px #39ff14;
            background-color: rgba(0, 0, 0, 0.9);
            padding: 3rem;
          }

          .btn-neon {
            background-color: transparent;
            border: 1px solid #39ff14;
            color: #39ff14;
            font-family: 'VT323', monospace;
            font-size: 1.5rem;
            text-transform: uppercase;
            transition: all 0.3s ease-in-out;
            box-shadow: 0 0 5px #39ff14;
          }

          .btn-neon:hover {
            background-color: #39ff14;
            color: #000;
            box-shadow: 0 0 20px #39ff14, 0 0 40px #39ff14;
            border-color: #39ff14;
          }

          /* Modal Styles */
          .riddler-modal {
            background-color: #000 !important;
            border: 2px solid #39ff14 !important;
            box-shadow: 0 0 20px #39ff14 !important;
            color: #39ff14 !important;
            font-family: 'VT323', monospace !important;
          }

          .riddler-input {
            background-color: #111 !important;
            border: 1px solid #39ff14 !important;
            color: #39ff14 !important;
            font-family: 'VT323', monospace !important;
          }

          .riddler-input:focus {
            background-color: #000 !important;
            border-color: #39ff14 !important;
            box-shadow: 0 0 10px #39ff14 !important;
            color: #39ff14 !important;
          }

          .modal-header {
            border-bottom: 1px solid #39ff14 !important;
          }
        `}
      </style>
      <div className="riddler-overlay">
        <Container>
          {isLoggedIn ? (
            <div className="text-center">
              <h1 className="display-1 neon-text mb-4">
                WELCOME AGENT {agentID}
              </h1>
              <p className="h3 mb-5">ACCESS GRANTED. SYSTEM UNLOCKED.</p>
            </div>
          ) : (
            <Row className="justify-content-center">
              <Col md={10} lg={8}>
                <div className="riddler-card text-center">
                  <h1 className="display-1 neon-text mb-4">RIDDLER'S ASYLUM</h1>
                  <p className="h3 mb-5">
                    &lt; SYSTEM_READY /&gt;
                    <br />
                    DECRYPTING LOGS...
                  </p>
                  <Button
                    variant="outline-success"
                    className="btn-neon px-5 py-2"
                    onClick={handleShow}
                  >
                    INITIATE PROTOCOL
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        contentClassName="riddler-modal"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title className="neon-text">
            {isRegistering
              ? "NEW SUBJECT REGISTRATION"
              : "IDENTITY VERIFICATION"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>AGENT ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ID"
                className="riddler-input"
                value={agentID}
                onChange={(e) => setagentID(e.target.value)}
                required
              />
            </Form.Group>

            {isRegistering && (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>EMAIL ADDRESS</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  className="riddler-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>PASSCODE</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Passcode"
                className="riddler-input"
                value={passcode}
                onChange={(e) => setpasscode(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-grid gap-2 mt-4">
              <Button
                variant="outline-success"
                type="submit"
                className="btn-neon"
              >
                {isRegistering ? "REGISTER IDENTITY" : "ACCESS SYSTEM"}
              </Button>
            </div>
          </Form>
          <div className="text-center mt-3">
            <p className="mb-0" style={{ color: "#39ff14" }}>
              {isRegistering ? "ALREADY HAVE CLEARANCE? " : "NO CLEARANCE? "}
              <button
                type="button"
                className="btn btn-link p-0 neon-text"
                style={{
                  color: "#39ff14",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? "LOGIN HERE" : "APPLY HERE"}
              </button>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;
