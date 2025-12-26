import { INotesType, ReqtHeadersType } from "../type/notes";
import { Notes } from "../mongoose/models/notes.model";
import xlsx from "xlsx";
import { findNoteTypeId } from "../static/note_Type";
import { User } from "../mongoose/models/user.model";

// Get all notes by ID
async function downloadNoteFile(req: { headers: ReqtHeadersType }, res: any) {
  const response = await Notes.findById(req.headers.noteid);
  try {
    if (!response || !response.file) {
      res.status(404).json({
        response: {
          code: 404,
          message: "File not found",
        },
      });
    } else {
      console.log("All users data reterived!", response);
      res.download(response.file);
    }
  } catch (error) {
    console.log("Error while finding the user data", error);
  }
}

async function notesBulkUpload(
  req: { headers: ReqtHeadersType; file: any },
  res: any
) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const createdDate = Date.now();
    const workBook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workBook.SheetNames[0];
    const sheet = workBook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    const formattedData = (jsonData as any[]).map((item) => ({
      title: item.title || item["Title"] || "",
      desc: item.desc || item["Desc"] || "",
      type: {
        id: findNoteTypeId(item.type || item["Type"] || "Other"),
        desc: item.type || item["Type"] || 4,
      },
      file: item.file || item["File"] || null,
      createdDate,
      userId: req.headers.userid,
    }));
    const insertNotes = await Notes.insertMany(formattedData);
    console.log("Bulk upload successful:", insertNotes);
    const noteCount =
      (await Notes.find({ userId: req.headers.userid })).length ?? 0;
    await User.findByIdAndUpdate(req.headers.userid, {
      totalNotesCount: noteCount,
    });
    res
      .status(200)
      .json({ message: "Bulk upload successful", data: formattedData });
  } catch (error) {
    console.error("Error during bulk upload:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export { downloadNoteFile, notesBulkUpload };
