import { NextResponse } from "next/server";
import Database from "better-sqlite3";

const db = new Database("database.db", { verbose: console.log });

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const user = db
      .prepare("SELECT * FROM users WHERE email = ? AND password = ?")
      .get(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
