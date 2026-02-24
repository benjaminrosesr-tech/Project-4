import express from "express";
import cors from "cors";
import db from "./dataDBConnections.js";
import userrouter from "./router/userrouter.js";




const server = express();

server.use(express.json());
server.use(cors());

server.use("/user", userrouter);


server.get("/", (req, res) => {
  res.send("The server is running");
});
server.listen(4000, () => {
  console.log("The server is running at port 4000");
});


export default server;