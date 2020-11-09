import express, { Request, Response } from "express";
import { body } from "express-validator";

import { register } from "../controllers/register_controller";
const router = express.Router();

router.post("/api/confirm", async (req, res) => {
  const name = req.body.name;
  const code = req.body.code;
  try {
    const result = await register(name, code);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

export { router as registerRouter };
