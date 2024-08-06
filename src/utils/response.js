const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    statusCode,
    payload: data,
    message,
    paginations: {
      prev: "",
      next: "",
      max: 10,
    },
  });
};

module.exports = response;
