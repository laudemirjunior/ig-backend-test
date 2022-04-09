import { NextFunction, Response } from "express";
import { ITask, TaskRepository } from "../repositories";

export const validateOwnerMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { email } = req;
  const { id } = req.params;

  try {
    const task: ITask = await new TaskRepository().findTaskWithUser(id);

    if (task.user.email !== email) {
      return res.status(401).json({ error: "Denied authorized" });
    }
    next();
  } catch {
    return res.status(404).json({ error: "Task not found" });
  }
};
