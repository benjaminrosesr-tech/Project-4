import express from "express";
import cors from "cors";
import db from "..dataDBConnections.js";

const router = express.Router();

router.post("/", (req, res) => {
  console.log("method: ", req.method);
  let agentID = req.body.agentID;
  let passcode = req.body.passcode;
  console.log(agentID, passcode);
  res.send("Login request received");
});

export default router;