const express = require("express");
const request = require("supertest");
const app = express();

test("GET /", async () => {
  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);
  expect(response.text).toBe("Hello World!");
});