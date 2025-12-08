export function customErrors(err, req, res, next) {
  if (err.statusCode === 404 || err.message.includes("not found")) {
    return res.status(404).json({ message: err.message });
  }
}

function handleError(res, error) {
  if (
    error.message.includes("required") ||
    error.message.includes("valid") ||
    error.name.include("FileTypeValidationError")
  ) {
    return res.status(400).json({ message: error.message });
  }
  return res
    .status(500)
    .json({ message: `Internal Server Error : ${error.stack}` });
}
