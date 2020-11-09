import express from "express";
import { json } from "body-parser";
import "express-async-errors";

import { signupRouter } from "./routes/signup";
import { registerRouter } from "./routes/register";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentuserRouter } from "./routes/currentuser";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(signupRouter);
app.use(registerRouter);
app.use(signinRouter);
app.use(currentuserRouter);
app.use(signoutRouter);

app.get("/api", (req, res) => {
  res.send("Hello Users!!");
});

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening on port 3000!!!!!!!!");
});
