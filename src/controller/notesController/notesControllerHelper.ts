import { Notes } from "../../mongoose/models/notes.model";
import { User } from "../../mongoose/models/user.model";

export async function updateNotesCount(userId: string): Promise<number> {
  const noteCount = (await Notes.find({ userId: userId })).length ?? 0;
  await User.findByIdAndUpdate(userId, {
    totalNotesCount: noteCount,
  });
  return Number(noteCount);
}
