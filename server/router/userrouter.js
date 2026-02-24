import express from "express";
import db from "../dataDBConnections.js";

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { agentID, passcode } = req.body;

  if (!agentID || !passcode) {
    return res.status(400).json({ message: "Agent ID and Passcode required" });
  }

  try {
    // Check if agent already exists
    const [existing] = await db.query(
      "SELECT * FROM agents WHERE agentID = ?",
      [agentID],
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: "Agent ID already registered" });
    }

    // Create new agent
    await db.query("INSERT INTO agents (agentID, passcode) VALUES (?, ?)", [
      agentID,
      passcode,
    ]);
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal System Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { agentID, passcode } = req.body;

  if (!agentID || !passcode) {
    return res.status(400).json({ message: "Credentials required" });
  }

  try {
    const [agents] = await db.query("SELECT * FROM agents WHERE agentID = ?", [
      agentID,
    ]);

    if (agents.length === 0 || agents[0].passcode !== passcode) {
      return res.status(401).json({ message: "Invalid Agent ID or Passcode" });
    }

    res
      .status(200)
      .json({ message: "Access Granted", agentID: agents[0].agentID });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal System Error" });
  }
});

export default router;
