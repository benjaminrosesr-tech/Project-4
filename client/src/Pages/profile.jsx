import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

function Profile({ agentID }) {
  const [profile, setProfile] = useState({
    full_name: "",
    location: "",
    bio: "",
    profile_picture_url: "",
    created_at: "",
  });

  useEffect(() => {
    if (agentID) {
      axios
        .get(`http://localhost:4000/profile/${agentID}`)
        .then((res) => {
          if (res.data && Object.keys(res.data).length > 0) {
            setProfile((prev) => ({ ...prev, ...res.data }));
          }
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [agentID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/profile", { agentID, ...profile })
      .then(() => alert("PROFILE UPDATED"))
      .catch((err) => {
        console.error(err);
        alert("UPDATE FAILED");
      });
  };

  return (
    <div className="mt-4">
      <h2 className="neon-text mb-4">AGENT PROFILE: {agentID}</h2>
      <Row>
        <Col md={4} className="mb-3">
          <div className="riddler-card">
            <div
              style={{
                height: "250px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000",
              }}
            >
              {profile.profile_picture_url ? (
                <img
                  src={profile.profile_picture_url}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span className="neon-text" style={{ fontSize: "5rem" }}>
                  ?
                </span>
              )}
            </div>
          </div>
          {profile.created_at && (
            <div className="mt-2 text-center">
              <small>
                ACTIVATED: {new Date(profile.created_at).toLocaleDateString()}
              </small>
            </div>
          )}
        </Col>
        <Col md={8}>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>FULL NAME</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={profile.full_name}
                onChange={handleChange}
                className="riddler-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>LOCATION</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="riddler-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>PROFILE PICTURE URL</Form.Label>
              <Form.Control
                type="text"
                name="profile_picture_url"
                value={profile.profile_picture_url}
                onChange={handleChange}
                className="riddler-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>BIO / BLURB</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="riddler-input"
              />
            </Form.Group>
            <Button
              variant="outline-success"
              type="submit"
              className="btn-neon"
            >
              SAVE CHANGES
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
