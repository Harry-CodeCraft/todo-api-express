import { SessionManager } from "../sessionManager";
import { getUnauthorizedError } from "../utils/error";
import { LogoutReqtHeadersType } from "../type/notes";

const sessionManager = new SessionManager();
sessionManager.isConnectedFn();

async function logoutUser(req: { headers: LogoutReqtHeadersType }, res: any) {
  try {
    const sessionId = req.headers.sessionid;
    const sessionExists = await sessionManager.sessionExists(sessionId);
    if (!sessionExists) {
      throw getUnauthorizedError("Session does not exist");
    }

    await sessionManager.clearSession(sessionId);
    return res.status(200).json({
      code: 200,
      message: `Logged out Successfully!`,
    });
  } catch (error) {
    return res.status(500).json({
      response: {
        code: 500,
        message: `Error occurend while logging out! ${error}`,
      },
      error,
    });
  }
}

export { logoutUser };
