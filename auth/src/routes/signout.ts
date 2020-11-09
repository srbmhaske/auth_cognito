import express from "express";

import { logout } from "../controllers/logout_controller";
const router = express.Router();

router.get("/api/signout", (req, res) => {
  logout();
  res.send({});
});

export { router as signoutRouter };
