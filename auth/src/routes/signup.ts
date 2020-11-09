import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { signup } from "../controllers/signup_controller";
import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();

router.post(
  "/api/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    try {
      const result = await signup(username, email, password);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  }
);

export { router as signupRouter };
