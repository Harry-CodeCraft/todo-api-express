import fs from "fs";
import path from "path";

export async function handleFileUpload(file: any): Promise<string | null> {
  if (!file) {
    return null;
  }

  const uploadDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const filePath = path.join(uploadDir, `${Date.now()}-${file.originalname}`);
  fs.writeFileSync(filePath, file.buffer);

  return filePath;
}
