import { Request, Response } from "express";
import { loginUserService } from "../../services";
import { handleError } from "../../utils";

export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await loginUserService(email, password);
    return res.status(200).json({ token: token });
  } catch (error) {
    return handleError(error, res);
  }
};
