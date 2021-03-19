db.getSiblingDB('taipei-runner');

db.createUser({
  user: "runner",
  pwd: "runner", // or cleartext password
  roles: [{ role: "readWrite", db: "taipei-runner" }],
});
