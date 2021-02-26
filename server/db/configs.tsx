export const psqlConfig =
  process.env.NODE_ENV === "development"
    ? "postgres://postgres:1234@localhost:5432/taipei-runner"
    : process.env.DATABASE_URL_PSQL || "";
export const mongoConfig =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017"
    : process.env.DATABASE_URL_MONGO || "";
