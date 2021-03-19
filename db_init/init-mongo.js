db.getSiblingDB('taipei-runner');

// const db =
// sDb.createCollection('feedback')

db.createUser({
  user: "runner",
  pwd: "runner", // or cleartext password
  roles: [{ role: "readWrite", db: "taipei-runner" }],
});
