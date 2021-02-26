db.createUser({
  user: "runner",
  pwd: "runner", // or cleartext password
  roles: [{ role: "readWrite", db: "taipei_runner" }],
});
