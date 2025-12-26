export const noteTypesObj = {
  1: "Personal",
  2: "Work",
  3: "Other",
  4: "Study",
};

export const findNoteTypeId = (desc: string): number => {
  const value = Object.entries(noteTypesObj);
  for (const [key, val] of value) {
    if (val === desc) {
      return Number(key);
    }
  }
  return 4;
};
