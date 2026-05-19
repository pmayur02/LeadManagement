
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import dbConnection from "./DBConnection/mongoConnection"
import router from "./Routes/index";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";

const app = express();

const PORT = process.env.PORT || 8000;

const corsOptions:CorsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(express.json());
app.use(cors(corsOptions))
app.use("/", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL is missing");
}

dbConnection(dbUrl);


app.get("/", (_req:Request, res:Response) => {
  res.send("Hello Express");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});