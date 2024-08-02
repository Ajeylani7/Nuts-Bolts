// /public/database.js
export async function loadDatabase() {
  try {
    const response = await fetch("./data.json"); // Ensure this path is correct
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Database loaded successfully:", data); // Debugging log
    return data;
  } catch (error) {
    console.error("Error loading database:", error);
    throw error;
  }
}

export async function getTableData(tableName) {
  const db = await loadDatabase();
  console.log("Fetched table data for:", tableName, db[tableName]); // Debugging log
  if (db && db[tableName]) {
    return db[tableName];
  }
  return [];
}
