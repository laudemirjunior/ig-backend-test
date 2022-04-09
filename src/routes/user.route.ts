import { Router } from "express";
import {
  loginUserController,
  patchUserController,
  registerUserController,
} from "../controllers";
import {
  validateModelMiddleware,
  validateTokenMiddleware,
} from "../middlewares";
import { userLoginModel, userModel } from "../models";

const userRouter = Router();

userRouter.post(
  "/register",
  validateModelMiddleware(userModel),
  registerUserController
);

userRouter.post(
  "/login",
  validateModelMiddleware(userLoginModel),
  loginUserController
);

userRouter.patch("/update", validateTokenMiddleware, patchUserController);

export { userRouter };
