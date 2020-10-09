const sendJSONResponse = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};

module.exports = sendJSONResponse