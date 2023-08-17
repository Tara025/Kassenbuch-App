import { Router } from "express";
import {
  registerUser,
  loginUser,
  getBalance}
from "../controllers/user.js";

const userRouter = new Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/balance/:userId", getBalance);

export default userRouter;
