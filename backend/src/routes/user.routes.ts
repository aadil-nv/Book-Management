import { Router } from "express";
import {getAllUsers,getUserById} from "../controllers/user.controller";
import { validateRequest } from "../middlewares/validateRequest";

export const userRouter = Router();

userRouter.get("/users",validateRequest, getAllUsers);
userRouter.get("/users/:id",validateRequest, getUserById);


