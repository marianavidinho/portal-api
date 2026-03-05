import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../database/db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    return res.status(401).json({ error: "Usuário inválido" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ error: "Senha inválida" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token });
});

export default router;
