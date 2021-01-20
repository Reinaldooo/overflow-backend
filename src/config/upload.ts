import { resolve, extname } from "path";
import { randomBytes } from "crypto";
import multer, { StorageEngine } from "multer";

interface IUploadConfig {
  driver: "s3" | "disk";
  multer: {
    storage: StorageEngine;
    fileFilter: any;
  };
}

const tmp = resolve(__dirname, "..", "..", "tmp");
const destination = resolve(__dirname, "..", "..", "uploads");

export const uploadsDirConfig = { destination, tmp };
// Multer will always use a tmp folder
export default {
  driver: process.env.STORAGE_DRIVER,
  multer: {
    storage: multer.diskStorage({
      destination: tmp,
      filename(_, file, cb) {
        // As for the file name, crypto function creates a random set of
        // chars and concat it with the original extension
        randomBytes(16, (err, res) => {
          if (err) return cb(err, null);
          return cb(null, res.toString("hex") + extname(file.originalname));
        });
      },
    }),
    fileFilter: (_, file, cb) => {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        return cb(null, true);
      }
      return cb(null, false);
    },
  },
} as IUploadConfig;
