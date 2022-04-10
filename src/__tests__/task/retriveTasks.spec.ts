import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import dbOptions from "..//ormconfig";
import { user } from "../mock";
import { userLogin } from "./../mock";
let token: any = {};

beforeAll(async () => {
  await createConnection(dbOptions);
  await request(app).post("/register").send(user);
});

describe("Get Tasks", () => {
  it("should not be able to get tasks", async () => {
    const response = await request(app).get("/tasks");
    expect(response.body).not.toHaveProperty("id");
    expect(response.status).toBe(401);
  });
  it("Should be able to login", async () => {
    const response: any = await request(app).post("/login").send(userLogin);
    token = JSON.parse(response.text);
    expect(response.status).toBe(200);
  });
  it("should be able to retrieve the task", async () => {
    const response = await request(app)
      .get(`/tasks`)
      .set("Authorization", `Token ${token.token}`);
    expect(response.status).toBe(200);
  });
});
