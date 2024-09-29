import whitelist from "./whitelist.js";
const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (whitelist.some((pattern) => pattern.test(origin))) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

export default credentials;
