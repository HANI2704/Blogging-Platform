import express from "express";
import postsRouter from "./routes/posts.js";
import adminRouter from "./routes/admin.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());

app.use("/api/posts", postsRouter);
app.use("/api/admin", adminRouter);

app.use(errorHandler);

export default app;
