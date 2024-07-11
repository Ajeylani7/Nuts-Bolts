export async function loadDatabase() {
  const response = await fetch("../data.json"); // Ensure this path is correct
  const data = await response.json();
  return data;
}

export async function getTableData(tableName) {
  const db = await loadDatabase();

  if (db && db[tableName]) {
    return db[tableName];
  }

  return [];
}
