import express from "express";
import cors from "cors";
import db from "./dataDBConnections.js";
import userrouter from "./router/userrouter.js";
import profilerouter from "./router/profilerouter.js";
import categoriesrouter from "./router/categoriesrouter.js";
import answerrouter from "./router/answererouter.js";




const server = express();

server.use(express.json());
server.use(cors());
server.use("/profile" , profilerouter)
server.use("/user", userrouter);
server.use("/categories", categoriesrouter)
server.use("/answers", answerrouter);


server.get("/", (req, res) => {
  res.send("The server is running");
});
server.listen(4000, () => {
  console.log("The server is running at port 4000");
});


export default server;