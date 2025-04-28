import { sign, verify } from "jsonwebtoken";
import { UserType } from "../type/user.js";

const secreatKey = "harsh@10352";
function setAuth(user: UserType) {
  return sign(user, secreatKey);
}

function getAuth(token: string) {
  if (!token) return console.error("Token not found!");
  return verify(token, secreatKey);
}

export { getAuth, setAuth };
