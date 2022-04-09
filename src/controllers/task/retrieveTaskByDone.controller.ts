import { Request, Response } from "express";
import { retrieveTaskByDoneService } from "../../services";
import { handleError } from "../../utils";

export const retrieveTaskByDoneController = async (
  req: Request,
  res: Response
) => {
  const { email } = req;
  const done = Boolean(req.params);

  try {
    const tasks = await retrieveTaskByDoneService(email, done);

    return res.status(200).json(tasks);
  } catch (error) {
    return handleError(error, res);
  }
};
