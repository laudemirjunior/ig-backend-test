import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import dbOptions from "../../database/ormconfig";
import { newUser, newUserLogin, task, user } from "../mock";
import { userLogin } from "./../mock";
let token: any = {};

beforeAll(async () => {
  await createConnection(dbOptions);
  await request(app).post("/register").send(user);
  await request(app).post("/register").send(newUser);
});

describe("Create Task", () => {
  it("should not be able to create task", async () => {
    const response = await request(app).post("/task").send(task);
    expect(response.body).not.toHaveProperty("id");
    expect(response.status).toBe(401);
  });
  it("Should be able to login", async () => {
    const response = await request(app).post("/login").send(userLogin);
    token = JSON.parse(response.text);
    expect(response.status).toBe(200);
  });
  it("should be able to create task", async () => {
    const response = await request(app)
      .post("/task")
      .send(task)
      .set("Authorization", `Token ${token.token}`);
    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(201);
  });
  it("should not be able to create task", async () => {
    const response = await request(app)
      .post("/task")
      .set("Authorization", `Token ${token.token}`);
    expect(response.body).not.toHaveProperty("id");
    expect(response.status).toBe(400);
  });
  it("Should be able to login", async () => {
    const response = await request(app).post("/login").send(newUserLogin);
    token = JSON.parse(response.text);
    expect(response.status).toBe(200);
  });
  it("should be able to create task", async () => {
    const response = await request(app)
      .post("/task")
      .send(task)
      .set("Authorization", `Token ${token.token}`);
    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(201);
  });
});
