module.exports = {
  sendJSON: (data) => ({
    ok: true,
    data,
  }),
  sendJSONAndToken: (message, token) => ({
    ok: true,
    data: {
      message,
      token,
    },
  }),
  sendJSONError: (error) => ({
    ok: false,
    error,
  }),
};
