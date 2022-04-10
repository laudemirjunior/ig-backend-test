import request from "supertest";
import { createConnection } from "typeorm";
import { app } from "../../app";
import { user, userLogin } from "../mock";
import dbOptions from "../ormconfig";
let token = {} as any;

beforeAll(async () => {
  await createConnection(dbOptions);
  await request(app).post("/register").send(user);
});

describe("Update user", () => {
  it("Should be not able to update username", async () => {
    const response = await request(app).patch("/update").send({
      name: "Testando",
    });
    expect(response.status).toBe(401);
  });
  it("Should be able to login", async () => {
    const response = await request(app).post("/login").send(userLogin);
    token = JSON.parse(response.text);
    expect(response.status).toBe(200);
  });
  it("Should be able to update username", async () => {
    const response = await request(app)
      .patch("/update")
      .set("Authorization", `Bearer ${token.token}`)
      .send({
        name: "Testando",
      });
    expect(response.status).toBe(200);
  });
});
