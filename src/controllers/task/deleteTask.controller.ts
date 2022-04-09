import { Request, Response } from "express";
import { deleteTaskService } from "../../services";
import { handleError } from "../../utils";

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteTaskService(id);
    return res.status(200).json({ message: "Task deleted with success" });
  } catch (error) {
    return handleError(error, res);
  }
};
