import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { router } from "./routes/tasks.js";

async function startup() {
  // await mongoose.connect(process.env.DATABASE_URL);
  const app = express();
  // const db = mongoose.connection;
  app.use(cors());
  app.use(express.json());
  // db.on("error",(err)=>console.log(err));
  // db.on("open",()=>console.log("DATABASE CONNECTED"));
  app.use("/api/tasks", router)
  app.listen(process.env.PORT,()=>console.log(`server is listening at port ${process.env.PORT}`));
}

startup();