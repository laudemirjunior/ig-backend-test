import { Request, Response } from "express";
import { retrieveTaskByStatusService } from "../../services";
import { handleError } from "../../utils";

export const retrieveTaskByStatusController = async (
  req: Request,
  res: Response
) => {
  const { email } = req;
  const { status } = req.params;

  try {
    const tasks = await retrieveTaskByStatusService(email, status);

    return res.status(200).json(tasks);
  } catch (error) {
    return handleError(error, res);
  }
};
