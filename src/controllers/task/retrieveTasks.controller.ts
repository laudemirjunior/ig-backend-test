import { Request, Response } from "express";
import { retrieveTasksService } from "../../services";
import { handleError } from "../../utils";

export const retrieveTasksController = async (req: Request, res: Response) => {
  const { email } = req;
  try {
    const tasks = await retrieveTasksService(email);
    return res.status(200).json(tasks);
  } catch (error) {
    return handleError(error, res);
  }
};
