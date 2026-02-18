import mysql from "mysql2/promise";
let db;
try {
  db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MiaGrace0127!",
    database: "qanda",
  });
  console.log("2 ✅ Connected to DB");
} catch (error) {
  console.log("1 ❌ Error connecting to DB");
}
export default db;
