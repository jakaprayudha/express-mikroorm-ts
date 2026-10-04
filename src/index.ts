import "reflect-metadata";
import express from "express";
import { MikroORM, RequestContext } from "@mikro-orm/core";
import config from "./config/mikro-orm.config";
import { User } from "./entities/User";

async function main() {
  const orm = await MikroORM.init(config);

  // 🔥 AUTO CREATE TABLE
  await orm.getSchemaGenerator().updateSchema();
  const app = express();

  app.use(express.json());

  // penting banget 🔥
  app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  });

  app.get("/", (req, res) => {
    res.send("API running 🚀");
  });

  // CREATE
  app.post("/users", async (req, res) => {
    const em = orm.em.fork();

    const user = em.create(User, req.body);
    await em.persistAndFlush(user);

    res.json(user);
  });

  // READ
  app.get("/users", async (req, res) => {
    const em = orm.em.fork();

    const users = await em.find(User, {});
    res.json(users);
  });

  app.listen(3000, () => {
    console.log("Server running http://localhost:3000");
  });
}

main();
