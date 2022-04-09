import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import dbOptions from "../../database/ormconfig";
import { task, user } from "../mock";
import { userLogin } from "./../mock";
let token: any = {};
let taskID = "";

beforeAll(async () => {
  await createConnection(dbOptions);
  await request(app).post("/register").send(user);
  const login: any = await request(app).post("/login").send(userLogin);
  token = JSON.parse(login.text);
  const response = await request(app)
    .post("/task")
    .send(task)
    .set("Authorization", `Token ${token.token}`);
  taskID = response.body.id;
});

describe("Creat Task", () => {
  it("should be able to delete task", async () => {
    const response = await request(app)
      .get(`/task/id/${taskID}`)
      .set("Authorization", `Token ${token.token}`);
    expect(response.status).toBe(200);
  });
  it("should be able to delete task", async () => {
    const response = await request(app)
      .get(`/task/status/false`)
      .set("Authorization", `Token ${token.token}`);
    expect(response.status).toBe(200);
  });
});
