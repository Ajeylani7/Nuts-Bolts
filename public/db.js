import Database from "better-sqlite3";
import { join } from "path";

const db = new Database(join(process.cwd(), "public", "database.sqlite"));

export function getUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
}

export function createUser(name, email, password) {
  return db
    .prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
    .run(name, email, password);
}

export function getPurchasesByEmail(email) {
  const user = getUserByEmail(email);
  if (!user) return [];
  return db.prepare("SELECT * FROM purchases WHERE user_id = ?").all(user.id);
}
