import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/api/api.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { corsOptions } from "./config/cors/cors.config.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import renderBranding from "./utils/renderBranding.js";
import credentials from "./config/cors/credentials.js";

const app = express();

app.use(morgan("short"));
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use("/api", apiRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  renderBranding();
});
