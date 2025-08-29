import { body } from "express-validator";


export const customerValidation = [
  body("username").trim().notEmpty().withMessage("Customer name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("isBlocked")
    .optional()
    .isBoolean()
    .withMessage("isBlocked must be a boolean value"),
 
];

