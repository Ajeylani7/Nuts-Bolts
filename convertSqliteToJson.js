const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const db = new sqlite3.Database("./public/data.sqlite");

const tables = [
  "productlines",
  "products",
  "offices",
  "employees",
  "customers",
  "payments",
  "orders",
  "orderdetails",
];

const dbData = {};

tables.forEach((table) => {
  db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    dbData[table] = rows;
    if (Object.keys(dbData).length === tables.length) {
      fs.writeFileSync("public/data.json", JSON.stringify(dbData, null, 2));
      console.log("Data successfully written to public/data.json");
      db.close();
    }
  });
});
