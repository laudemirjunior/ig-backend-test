import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import dbOptions from "../../database/ormconfig";
import { user } from "../mock";

beforeAll(async () => {
  await createConnection(dbOptions);
  await request(app).post("/register").send(user);
});

describe("Create user", () => {
  it("Should not be able to create a new user", async () => {
    const response = await request(app).post("/register").send(user);
    expect(response.status).toBe(409);
  });
});
