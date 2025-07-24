const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("bets.db");
db.run("CREATE TABLE IF NOT EXISTS bets (id INTEGER PRIMARY KEY AUTOINCREMENT, wallet TEXT, multiplier REAL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");

app.post("/api/multiplier", (req, res) => {
  const { wallet, multiplier } = req.body;
  db.run("INSERT INTO bets (wallet, multiplier) VALUES (?, ?)", [wallet, multiplier]);
  res.sendStatus(200);
});

app.get("/api/multiplier/:wallet", (req, res) => {
  const wallet = req.params.wallet;
  db.all("SELECT * FROM bets WHERE wallet = ?", [wallet], (err, rows) => {
    if (err) return res.sendStatus(500);
    res.json(rows);
  });
});

app.listen(4000, () => console.log("✅ Backend running on http://localhost:4000"));