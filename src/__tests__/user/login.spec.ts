import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import dbOptions from "../../database/ormconfig";
import { incorrectUser, user } from "../mock";
import { userLogin } from "./../mock";

beforeAll(async () => {
  await createConnection(dbOptions);
  await request(app).post("/register").send(user);
});

describe("Login user", () => {
  it("Should be able to login", async () => {
    const response = await request(app).post("/login").send(userLogin);
    expect(response.status).toBe(200);
  });
  it("Should not be able to login", async () => {
    const response = await request(app).post("/login").send(incorrectUser);
    expect(response.status).toBe(401);
  });
});
