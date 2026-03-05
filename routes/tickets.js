import express from "express";
import db from "../database/db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const result = await db.query(
    "SELECT * FROM tickets ORDER BY created_at DESC"
  );

  res.json(result.rows);
});

router.post("/", auth, async (req, res) => {
  const { course, unit } = req.body;

  const result = await db.query(
    `INSERT INTO tickets (course, unit, status)
     VALUES ($1,$2,'pending')
     RETURNING *`,
    [course, unit]
  );

  res.json(result.rows[0]);
});

router.patch("/:id/approve", auth, async (req, res) => {
  const { id } = req.params;

  const result = await db.query(
    `UPDATE tickets
     SET status='approved'
     WHERE id=$1
     RETURNING *`,
    [id]
  );

  res.json(result.rows[0]);
});

router.patch("/:id/reject", auth, async (req, res) => {
  const { id } = req.params;

  const result = await db.query(
    `UPDATE tickets
     SET status='rejected'
     WHERE id=$1
     RETURNING *`,
    [id]
  );

  res.json(result.rows[0]);
});

export default router;
