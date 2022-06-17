import dotenv from "dotenv";
import express from "express";
import { taskRouter, userRouter } from "./routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

export { app };
