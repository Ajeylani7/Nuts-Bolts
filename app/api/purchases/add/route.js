import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDb() {
  return open({
    filename: "user_database.db",
    driver: sqlite3.Database,
  });
}

export async function POST(req) {
  try {
    const { userId, productId } = await req.json();
    const db = await openDb();

    await db.run("INSERT INTO purchases (user_id, product_id) VALUES (?, ?)", [
      userId,
      productId,
    ]);

    return NextResponse.json(
      { message: "Purchase added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding purchase:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
