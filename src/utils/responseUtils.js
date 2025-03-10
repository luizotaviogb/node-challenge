/**
 * Sends a standardized JSON response to the client.
 */
const sendResponse = (
  res,
  status,
  success,
  message,
  data = null,
  error = null,
) => {
  const response = { success, message };
  if (data !== null) response.data = data;
  if (error !== null) response.error = error;
  return res.status(status).json(response);
};

module.exports = { sendResponse };
