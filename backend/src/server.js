import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";
import path from "path";
dotenv.config();
const app = express();

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);


app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log("Incoming cookies:", req.cookies);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
    console.log("Server is running on PORT:" + PORT);
    connectDB();
});

