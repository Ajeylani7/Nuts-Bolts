export async function loadDatabase() {
  try {
    console.log("Fetching data.json...");
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("Data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error loading database:", error);
    throw error; // Re-throw the error so it can be caught in the calling function
  }
}

export async function getTableData(tableName) {
  try {
    const db = await loadDatabase();
    if (db && db[tableName]) {
      return db[tableName];
    }
    return [];
  } catch (error) {
    console.error(`Error getting table data for ${tableName}:`, error);
    return []; // Return an empty array in case of error
  }
}
