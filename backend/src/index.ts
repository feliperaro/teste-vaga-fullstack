import express, { Express } from "express";
import router from "./routes/api";

const app: Express = express();

app.use(express.json());
app.use("/api/", router);

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
