enum UserEndPoints {
  GET = "/user/:id",
  GET_ALL = "/user/all",
  POST_USER = "/user/add",
  PUT_USER = "/user/update",
  DELETE_USER = "/user/delete/:id",
}

enum AuthEndPoints {
  LOGIN = "/login",
  REGISTER = "/register",
}

enum NotesEndPoints {
  CREATE = "/create",
  UPDATE = "/update/:id",
  GET_ALL = "/all",
  GET_ALL_V1 = "/all/:skip/:limit",
  GET = "/get",
  DELETE = "/delete",
}
enum FileEndPoints {
  GET_FILE = "/file/download",
  CSV_UPLOAD_BULK = "/file/upload/csv-bulk",
}

export { UserEndPoints, AuthEndPoints, NotesEndPoints, FileEndPoints };
