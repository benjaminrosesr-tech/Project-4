import express from "express";
import db from "../dataDBConnections.js";

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
 console.log (req.body)
  const { agentID, passcode, email } = req.body;

  if (!agentID || !passcode) {
    return res.status(400).json({ message: "Agent ID and Passcode required" });
  }

  try {
    // Check if agent already exists
    const [existing] = await db.query(
      "SELECT * FROM users WHERE agentID = ?",
      [agentID],
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: "Agent ID already registered" });
    }

    // Create new agent
    await db.query("INSERT INTO users (agentID, passcode, email) VALUES (?, ?, ?)", [
      agentID,
      passcode,
      email,
    ]);
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal System Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  console.log ("Inside Router")
  const { agentID, passcode } = req.body;

  if (!agentID || !passcode) {s
    return res.status(400).json({ message: "Credentials required" });
  }

  try {
    const [agents] = await db.query(
      "SELECT * FROM users WHERE agentID = ? AND passcode = ?",
      [agentID, passcode],
    );

   // if (agents.length === 0 || agents[0].passcode !== passcode) {
   //   return res.status(401).json({ message: "Invalid Agent ID or Passcode" });
   // }

   console.log(agents)
    res
      .status(200)
      .json({ message: "Access Granted", agentID: agents[0].agentID, userID: agents[0].userID});
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal System Error" });
  }
});

export default router;
