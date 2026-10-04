import { Options } from "@mikro-orm/core";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { User } from "../entities/User";

const config: Options<SqliteDriver> = {
  entities: [User],
  dbName: "db.sqlite",
  driver: SqliteDriver,
  debug: true,
};

export default config;
