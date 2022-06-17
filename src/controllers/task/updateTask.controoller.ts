import { Request, Response } from "express";
import { ITask } from "../../repositories";
import { updateTaskService } from "../../services";
import { handleError } from "../../utils";

export const updateTaskController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const task: ITask = await updateTaskService(body, id);
    return res.status(200).json(task);
  } catch (error) {
    return handleError(error, res);
  }
};
