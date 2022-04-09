import { Request, Response } from "express";
import { registerUserService } from "../../services";
import { handleError } from "../../utils";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const newUser = await registerUserService(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return handleError(error, res);
  }
};
