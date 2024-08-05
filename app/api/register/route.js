import { NextResponse } from "next/server";
import Database from "better-sqlite3";

const db = new Database("database.db", { verbose: console.log });

export async function POST(req) {
  const { email, password, name } = await req.json();

  try {
    const existingUser = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email);

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    db.prepare(
      "INSERT INTO users (email, password, name) VALUES (?, ?, ?)"
    ).run(email, password, name);

    return NextResponse.json(
      {
        message: `${name}, you have been successfully registered.`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
