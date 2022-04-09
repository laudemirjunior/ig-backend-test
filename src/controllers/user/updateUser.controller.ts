import { Request, Response } from "express";
import { updateUserService } from "../../services";
import { handleError } from "../../utils";

export const patchUserController = async (req: Request, res: Response) => {
  const { email } = req;
  const { name } = req.body;

  try {
    updateUserService(email, name);
    return res.status(204).json();
  } catch (error) {
    return handleError(error, res);
  }
};
