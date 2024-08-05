const Database = require("better-sqlite3");

const db = new Database("user_database.db");

// Create users table
db.prepare(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE, password TEXT)"
).run();

// Create purchased_items table
db.prepare(
  "CREATE TABLE IF NOT EXISTS purchased_items (id INTEGER PRIMARY KEY, user_id INTEGER, item_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id))"
).run();

console.log("Database and tables created successfully.");

db.close();
