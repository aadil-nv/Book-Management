import { Response, NextFunction } from "express";
import { User } from "../models/user.schema";
import { USER_MESSAGES } from "../constants/user.message.constants";
import { HttpStatusCode } from "../constants/enums";
import { AuthRequest } from "../utils/interface";



export const getAllUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log("caling users is ==>");
  
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: USER_MESSAGES.UNAUTHORIZED });
    }

    const users = await User.find();
    return res.status(HttpStatusCode.OK).json({ users });
  } catch (error) {
    next(error);
  }
};



export const getUserById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: USER_MESSAGES.CUSTOMER_NOT_FOUND });
    }

    return res.status(HttpStatusCode.OK).json({ user });
  } catch (error) {
    next(error);
  }
};

