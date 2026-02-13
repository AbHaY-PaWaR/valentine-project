import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import valentineRoutes from "./routes/valentine.routes.js";
import specialPasswordRoutes from "./routes/specialPassword.routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use("/api/valentine", valentineRoutes);
app.use("/api/special-passwords", specialPasswordRoutes);

const clientDistPath = path.resolve(__dirname, "../client/dist");
const clientIndexPath = path.join(clientDistPath, "index.html");
const hasClientBuild = fs.existsSync(clientIndexPath);

if (hasClientBuild) {
  app.use(express.static(clientDistPath));

  app.get("/", (req, res) => {
    res.sendFile(clientIndexPath);
  });

  app.get("*", (req, res) => {
    res.sendFile(clientIndexPath);
  });
} else {
  app.get("/", (req, res) => {
    res.send("Valentine API is running");
  });
}

export default app;
