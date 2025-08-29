import { Router } from "express";
import {getAllUsers,getUserById} from "../controllers/user.controller";
import {authMiddleware} from "../middlewares/authMiddleware";

export const userRouter = Router();

userRouter.get("/users", authMiddleware, getAllUsers);
userRouter.get("/user-details/:id", authMiddleware, getUserById);


