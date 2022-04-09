import { Request, Response } from "express";
import { createTaskService } from "../../services";
import { handleError } from "../../utils";

export const createTaskController = async (req: Request, res: Response) => {
  const body = req.body;
  const { email } = req;

  try {
    const task = await createTaskService(body, email);
    return res.status(201).json(task);
  } catch (error) {
    return handleError(error, res);
  }
};
