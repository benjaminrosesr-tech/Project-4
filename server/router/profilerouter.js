import express from "express";
import db from "../dataDBConnections.js";


const router = express.Router();


// GET Profile by Agent ID
router.get("/:agentID", (req, res) => {
  const agentID = req.params.agentID;
  const q = "SELECT * FROM user_profiles WHERE userID = ?";

  db.query(q, [agentID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
});

// POST (Create or Update) Profile
router.post("/", (req, res) => {
  const { agentID, name, location, blurb, pictureUrl } = req.body;

  const q = `
    INSERT INTO user_profiles (full_name, location, bio, profile_picture_url) 
    VALUES (?, ?, ?, ?, ?) 
    ON DUPLICATE KEY UPDATE 
    full_name = ?, location = ?, bio = ?, profile_picture_url = ?
  `;
  const values = [
    agentID,
    name,
    location,
    blurb,
    pictureUrl,
    name,
    location,
    blurb,
    pictureUrl,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Profile updated successfully");
  });
});

export default router;
