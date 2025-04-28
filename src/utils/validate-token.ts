import { verify } from "jsonwebtoken";
import { JwtDecodeType, UserType } from "../type/user";
import { jwtDecode } from "jwt-decode";

function validateToken(
  req: { body: UserType; headers: any },
  res: any,
  next: any
) {
  if (!req.headers["authorization"]) {
    return res.status(403).json({
      response: { code: 403, message: "Bearer token is missing!" },
    });
  }

  try {
    const decode = verify(
      req.headers["authorization"],
      process.env.SERVER_SECRET || ""
    );
    return next();
  } catch (error) {
    return res.status(403).json({
      response: { code: 403, message: "Bearer token is expired or invalid!" },
      error,
    });
  }
}

function decodeJwtToken(token: string) {
  const decodedToken: JwtDecodeType = jwtDecode(token);
  console.log("log", token, decodedToken);
  return decodedToken;
}

export { validateToken, decodeJwtToken };
