import express from "express";
import db from "../dataDBConnections.js";

const router = express.Router();

// GET /categories - Retrieve all categories for the Asylum Logs
router.get("/", async (req, res) => {
  try {
    // Select all columns from the categories table
    const query = "SELECT * FROM categories";
    const [results] = await db.query(query);
    res.json(results);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// GET /categories/:id/questions - Retrieve questions for a specific category
router.get("/:id/questions", async (req, res) => {
  try {
    const categoryID = req.params.id;
    const query = "SELECT * FROM questions WHERE categoryID = ?";
    const [results] = await db.query(query, [categoryID]);
    res.json(results);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /categories/:id/questions - Add a new question to a specific category
router.post("/:id/questions", async (req, res) => {
  const categoryID = req.params.id;
  const { title, content, userID } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and Question are required" });
  }

  try {
    const query =
      "INSERT INTO questions (categoryID, title, content, userID) VALUES (?, ?, ?, ?)";
    await db.query(query, [categoryID, title, content, userID]);
    res.status(201).json({ message: "Question added successfully" });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
