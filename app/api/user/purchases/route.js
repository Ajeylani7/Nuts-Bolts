import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDb() {
  return open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });
}

export async function GET(req) {
  try {
    const email = req.headers.get("email");
    const db = await openDb();
    const purchases = await db.all(
      "SELECT * FROM purchases WHERE userEmail = ?",
      [email]
    );

    return NextResponse.json(purchases, { status: 200 });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
