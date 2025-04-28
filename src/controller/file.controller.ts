import { ReqtHeadersType } from "../type/notes";
import { Notes } from "../mongoose/models/notes.model";

// Get all notes by ID
async function downloadNoteFile(req: { headers: ReqtHeadersType }, res: any) {
  // const decodedToken: JwtDecodeType = decodeJwtToken(req.headers.authorization);
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

export { downloadNoteFile };
