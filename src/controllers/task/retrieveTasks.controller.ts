import { NextFunction, Response } from "express";
import { retrieveTasksService } from "../../services";
import { handleError } from "../../utils";

export const retrieveTasksController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { email } = req;
  try {
    const tasks = await retrieveTasksService(email);
    return res.status(200).json(tasks);
  } catch (error) {
    return handleError(error, res);
  }
};
