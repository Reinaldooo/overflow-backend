import fs from "fs";
import path from "path";
import { uploadsDirConfig } from "@config/upload";
import IStorageProvider from "../models/IStorageProvider";

export default class DiskStorage implements IStorageProvider {
  public async save(file: string): Promise<string> {
    // Multer will always need a tmp folder, thats why i have to rename it here
    await fs.promises.rename(
      path.resolve(uploadsDirConfig.tmp, file),
      path.resolve(uploadsDirConfig.destination, file)
    );
    return file;
  }

  public async delete(file: string): Promise<void> {
    const filePath = path.resolve(uploadsDirConfig.destination, file);
    try {
      // Stat function returns stats from a file or a error if non-existant
      // It's a way to check if the file exists
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}
