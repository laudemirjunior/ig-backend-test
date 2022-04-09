import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  retrieveTaskByIdController,
  retrieveTaskByStatusController,
  retrieveTasksController,
  updateTaskController,
} from "../controllers";
import {
  validateModelMiddleware,
  validateOwnerMiddleware,
  validateTokenMiddleware,
} from "../middlewares";
import { taskModel } from "../models";

const taskRouter = Router();

taskRouter.post(
  "/task",
  validateModelMiddleware(taskModel),
  validateTokenMiddleware,
  createTaskController
);

taskRouter.get("/tasks", validateTokenMiddleware, retrieveTasksController);

taskRouter.patch(
  "/task/:id",
  validateTokenMiddleware,
  validateOwnerMiddleware,
  updateTaskController
);

taskRouter.delete(
  "/task/:id",
  validateTokenMiddleware,
  validateOwnerMiddleware,
  deleteTaskController
);

taskRouter.get(
  "/task/id/:id",
  validateTokenMiddleware,
  validateOwnerMiddleware,
  retrieveTaskByIdController
);

taskRouter.get(
  "/task/status/:status",
  validateTokenMiddleware,
  retrieveTaskByStatusController
);

export { taskRouter };
