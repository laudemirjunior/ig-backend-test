import { Request, Response } from "express";
import { retrieveTaskByIdService } from "../../services";
import { handleError } from "../../utils";

export const retrieveTaskByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const task = await retrieveTaskByIdService(id);
    return res.status(200).json(task);
  } catch (error) {
    return handleError(error, res);
  }
};
