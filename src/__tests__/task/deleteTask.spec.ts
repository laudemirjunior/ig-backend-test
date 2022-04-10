import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import dbOptions from "..//ormconfig";
import { newUser, task, user, userLogin } from "../mock";
import { newUserLogin } from "./../mock";
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
  it("should not be able to delete task without token", async () => {
    const response = await request(app).delete(`/task/${taskID}`);
    expect(response.body).toHaveProperty("error");
    expect(response.status).toBe(401);
  });
  it("should be able to delete task", async () => {
    const response = await request(app)
      .delete(`/task/${taskID}`)
      .set("Authorization", `Token ${token.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });
  it("should not be able to delete task that not exist", async () => {
    const response = await request(app)
      .delete(`/task/${taskID}`)
      .set("Authorization", `Token ${token.token}`);
    expect(response.body).toHaveProperty("error");
    expect(response.status).toBe(404);
  });
  it("should be able to create task", async () => {
    const response = await request(app)
      .post("/task")
      .send(task)
      .set("Authorization", `Token ${token.token}`);
    taskID = response.body.id;
    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(201);
  });
  it("Create a new user if not exist", async () => {
    await request(app).post("/register").send(newUser);
  });
  it("Should be able to login", async () => {
    const response = await request(app).post("/login").send(newUserLogin);
    token = JSON.parse(response.text);
    expect(response.status).toBe(200);
  });
  it("should not be able to delete task", async () => {
    const response = await request(app)
      .delete(`/task/${taskID}`)
      .set("Authorization", `Token ${token.token}`);
    expect(response.body).toHaveProperty("error");
    expect(response.status).toBe(401);
  });
});
