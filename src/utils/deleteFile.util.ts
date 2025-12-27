import fs from "fs/promises";

export async function deleteFileIfExists(filePath?: string) {
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch (err: any) {
    if (err.code !== "ENOENT") {
      console.error("Failed to delete file:", err);
    }
  }
}
