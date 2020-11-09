import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { signin } from "../controllers/signin_controller";
import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();

router.post(
  "/api/signin",

  async (req: Request, res: Response) => {
    const username = req.body.name;
    const password = req.body.password;

    try {
      const msg = await signin(username, password);
      res.send({ msg });
    } catch (err) {
      res.send("ERROR:" + err);
    }
  }
);

export { router as signinRouter };
