export function handleError(err, req, res, next) {
  const { message, name, statusCode, stack } = err;

  if (statusCode === 404 || message.includes("not found")) {
    return res.status(404).json({ message });
  }

  const badRequestKeywords = ["required", "valid"];
  const isBadRequest =
    badRequestKeywords.some((keyword) => message.includes(keyword)) ||
    name === "FileTypeValidationError";

  if (isBadRequest) {
    return res.status(400).json({ message });
  }

  return res.status(500).json({
    message: `Internal Server Error : ${message}`,
  });
}
