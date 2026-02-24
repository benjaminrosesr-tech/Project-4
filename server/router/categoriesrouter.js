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
router.get('/:id/questions', async (req, res) => {
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





export default router;
