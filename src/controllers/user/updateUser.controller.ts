import { Request, Response } from "express";
import { updateUserService } from "../../services";
import { handleError } from "../../utils";

export const patchUserController = async (req: Request, res: Response) => {
  const { email } = req;
  const { name } = req.body;

  try {
    const user = await updateUserService(email, name);
    return res.status(200).json(user);
  } catch (error) {
    return handleError(error, res);
  }
};
