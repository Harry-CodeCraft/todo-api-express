import { Router } from "express";
import { FileEndPoints, NotesEndPoints } from "../api/enums/endpoints.enums";
import { validateToken } from "../utils/validate-token";
import {
  createNote,
  deleteNotes,
  getAllNotesByUserId,
} from "../controller/notesController/notes.controller";
import { getSessionFromRedis } from "../utils/validation";
import multer from "multer";
import {
  downloadNoteFile,
  notesBulkUpload,
} from "../controller/file.controller";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1, files: 1 },
});
router.post(
  NotesEndPoints.CREATE,
  getSessionFromRedis,
  validateToken,
  upload.single("file"),
  createNote
);
router.get(
  NotesEndPoints.GET,
  getSessionFromRedis,
  validateToken,
  getAllNotesByUserId
);
router.get(
  NotesEndPoints.GET_ALL,
  getSessionFromRedis,
  validateToken,
  getAllNotesByUserId
);
router.delete(
  NotesEndPoints.DELETE,
  getSessionFromRedis,
  validateToken,
  deleteNotes
);
router.get(
  FileEndPoints.GET_FILE,
  getSessionFromRedis,
  validateToken,
  downloadNoteFile
);
router.post(
  FileEndPoints.CSV_UPLOAD_BULK,
  getSessionFromRedis,
  validateToken,
  upload.single("file"),
  notesBulkUpload
);

export { router as NotesRouter };
