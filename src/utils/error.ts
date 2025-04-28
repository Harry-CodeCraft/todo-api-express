export enum ErrorType {
  UNAUTHORIZED = 401,
  BADREQUEST = 400,
}

function getErrorMessage(error?: unknown) {
  if (error === undefined) {
    return undefined;
  } else if (typeof error === "string") {
    return error;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return (
      (error as { toString?: () => string }).toString?.() || "unknown error"
    );
  }
}

export function getError(code: ErrorType, message?: string) {
  const error = new Error(message);
  (error as any).statusCode = code;

  return error;
}

export function getUnauthorizedError(error?: unknown) {
  const message = getErrorMessage(error)?.substring(0, 80);
  return getError(ErrorType.UNAUTHORIZED, message);
}
