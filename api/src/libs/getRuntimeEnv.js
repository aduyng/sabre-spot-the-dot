module.exports = function getRuntimeEnv() {
  return process.env.STD_RUNTIME_ENV || process.env.NODE_ENV || "development";
};
