import { ReqtHeadersType, INotesType, ReqtParamsType } from "../type/notes";
import { Notes } from "../mongoose/models/notes.model";
import { User } from "../mongoose/models/user.model";
import { JwtDecodeType } from "../type/user";
import { decodeJwtToken } from "../utils/validate-token";
import { handleFileUpload } from "../utils/upload-file";

// Create Notes
async function createNote(
  req: { body: INotesType; headers: ReqtHeadersType; file: any },
  res: any
) {
  try {
    const decodedToken: JwtDecodeType = decodeJwtToken(
      req.headers.authorization
    );
    const filePath = await handleFileUpload(req.file);
    const createdDate = Date.now();
    const noteModel = new Notes({
      createdDate,
      userId: decodedToken.id,
      file: filePath,
      ...req.body,
    });

    const data = await noteModel.save();
    const noteCount =
      (await Notes.find({ userId: decodedToken.id })).length ?? 0;
    await User.findByIdAndUpdate(decodedToken.id, {
      totalNotesCount: noteCount + 1,
    });
    return res.status(201).json({
      response: { code: 201, message: "Successfully Created Note!" },
      totalNotes: noteCount + 1,
      data,
    });
  } catch (error) {
    console.log(
      "Error while creating the user note or incorrect userId",
      error
    );
    return res.status(401).json({
      response: {
        code: 401,
        message: "Error while creating the user note or incorrect userId",
      },
    });
  }
}

// Get all notes by ID
async function getAllNotesByUserId(
  req: { headers: ReqtHeadersType; query: ReqtParamsType },
  res: any
) {
  const { skip, limit } = req.query!;
  const decodedToken: JwtDecodeType = decodeJwtToken(req.headers.authorization);
  const skipped = Number(skip === 0 ? 1 : skip - 1) * 20;
  try {
    const data = await Notes.find({ userId: decodedToken.id })
      .sort({
        createdDate: -1,
      })
      .skip(skipped)
      .limit(Number(limit));
    const userData = await User.findById(decodedToken.id);
    if (skipped + data.length > (userData?.totalNotesCount ?? 0)) {
      return res.status(401).json({
        response: {
          code: 401,
          page: skip,
          limit,
          totalNotes: userData?.totalNotesCount || null,
          message: [`Invalid skip or limit!`, `You reached the end of notes!`],
        },
      });
    }
    res.status(200).json({
      response: { code: 200, message: "Successfully reterived user notes!" },
      data,
      page: skip,
      limit,
      totalNotes: userData?.totalNotesCount || null,
    });
  } catch (error) {
    console.log("Error while finding the user data", error);
  }
}

// Delete user data
async function deleteNotes(req: { headers: ReqtHeadersType }, res: any) {
  const decodedToken: JwtDecodeType = decodeJwtToken(req.headers.authorization);
  try {
    const data = await Notes.deleteOne({
      _id: req.headers.noteid,
      userId: decodedToken.id,
    });
    if (data.deletedCount === 0) {
      return res.status(401).json({
        response: {
          code: 401,
          message: `Invalid noteId or userId! OR Note doesn't exist!`,
        },
      });
    }
    console.log("Successfully deleted the note!", data);
    res.status(200).json({
      response: { code: 200, message: "Successfully deleted the note!" },
      data,
    });
  } catch (error) {
    console.log("Error while deleting the user data", error);
  }
}

export { createNote, getAllNotesByUserId, deleteNotes };
