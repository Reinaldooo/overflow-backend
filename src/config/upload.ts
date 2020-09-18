import { resolve, extname } from "path";
import { randomBytes } from "crypto";
import multer from "multer";

const destination = resolve(__dirname, "..", "..", "uploads");

export const uploadsDir = destination;
// This dir will be used to delete replace avatars on UpdateUserAvatar service
export const multerConfig = {
  storage: multer.diskStorage({
    destination,
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
};
