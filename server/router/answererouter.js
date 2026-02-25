// c:\Users\uniqu\OneDrive\Desktop\Coding CLass\WorkSpace\Project 4\server\router\answererouter.js
import express from "express";
import db from "../dataDBConnections.js";

const router = express.Router();

// GET /answers/:questionID - Retrieve answers for a specific question
router.get("/:questionID", async (req, res) => {
  try {
    const questionID = req.params.questionID;
    const query = "SELECT * FROM answers WHERE questionID = ?";
    const [results] = await db.query(query, [questionID]);
    console.log (results)
    res.json(results);
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /answers - Add a new answer
router.post("/", async (req, res) => {
  console.log ("isiderrouter")
  const userID = req.body.userID
  const questionID = req.body.questionID; 
  const content = req.body.answer

  console.log ("userID", userID, "questionID", questionID, "content", content)

  if (!questionID || !userID || !content) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const query =
      "INSERT INTO answers (questionID, userID, content) VALUES (?, ?, ?)";
    await db.query(query, [questionID, userID, content]);
    res.status(201).json({ message: "Answer added successfully" });
  } catch (error) {
    console.error("Error adding answer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
