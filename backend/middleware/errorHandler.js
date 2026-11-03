export function notFound(_req, res) {
  res.status(404).json({ message: "Route not found" });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  console.error(err);
  res.status(500).json({ message: "Couldn't send your message. Please email me directly." });
}