import express from "express";
import db from "../dataDBConnections.js";


const router = express.Router();


// GET Profile by Agent ID
router.get("/:agentID", (req, res) => {
  console.log("inside profile router, get")
  const agentID = req.params.agentID;
  const q = "SELECT * FROM user_profiles WHERE userID = ?";

  db.query(q, [agentID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
});

// POST (Create or Update) Profile
router.post("/", (req, res) => {
  console.log (req.body)
  const { full_name, location, bio, profile_picture_url } = req.body;

  const q = `
    INSERT INTO user_profiles (full_name, location, bio, profile_picture_url) 
    VALUES (?, ?, ?, ?) 
  `;
  const values = [
    full_name,
    location,
    bio,
    profile_picture_url,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Profile updated successfully");
  });
});

export default router;
