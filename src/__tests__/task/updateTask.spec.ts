import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import dbOptions from "..//ormconfig";
import { newUser, newUserLogin, task, user } from "../mock";
import { userLogin } from "./../mock";
var token: any = {};
var taskID = "";

beforeAll(async () => {
  await createConnection(dbOptions);
  await request(app).post("/register").send(user);
  await request(app).post("/register").send(newUser);
  const login: any = await request(app).post("/login").send(userLogin);
  token = JSON.parse(login.text);
  const response = await request(app)
    .post("/task")
    .send(task)
    .set("Authorization", `Token ${token.token}`);
  taskID = response.body.id;
});

describe("Creat Task", () => {
  it("should be able to update task", async () => {
    const response = await request(app)
      .patch(`/task/${taskID}`)
      .send(task)
      .set("Authorization", `Token ${token.token}`);
    expect(response.status).toBe(200);
  });
  it("Should be able to login", async () => {
    const response = await request(app).post("/login").send(newUserLogin);
    token = JSON.parse(response.text);
    expect(response.status).toBe(200);
  });
  it("should not be able to update task", async () => {
    const response = await request(app)
      .patch(`/task/${taskID}`)
      .send(task)
      .set("Authorization", `Token ${token.token}`);
    expect(response.status).toBe(401);
  });
});
