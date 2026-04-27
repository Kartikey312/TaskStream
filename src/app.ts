import express from "express";
import cors from "cors";
import emailRoutes from "./routes/email.routes";

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  })
);

app.use(express.json());


app.use("/api", emailRoutes);

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});