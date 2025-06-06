import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
    console.log("Initialized database");
  } catch (error) {
    console.log("Error initializing database", error);
    process.exit(1);
  }
}

app.post("/api/transactions", async (req, res) => {
  const { title, amount, category, user_id } = req.body;
  try {
    if (!title || !amount || !category || !user_id) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const transaction = await sql`
            INSERT INTO transactions(user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `;
    res.status(201).json(transaction[0]);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/api/transactions/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ msg: "No user id found" });

    const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `;

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ msg: "No id provided" });
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ msg: "Id is not a number" });
    }
    const result = await sql`
            DELETE FROM transactions WHERE id = ${id} RETURNING *
        `;
    if (result.length === 0) {
      return res.status(404).json({ msg: "Transaction not found" });
    }
    res.status(200).json({ msg: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
app.get("/api/transactions/summary/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
        `;
    const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0
            `;
    const expensesResult = await sql`
        SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0
        `;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
initDB().then(() => {
  app.listen(PORT, () => console.log("Server started on port:", PORT));
});
