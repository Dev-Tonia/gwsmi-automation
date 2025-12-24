import fs from "fs/promises";

export async function deleteFileIfExists(filePath?: string) {
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch (err) {
    // File might not exist or already deleted — ignore safely
    console.error("Failed to delete file:", err);
  }
}
