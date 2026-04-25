import express from "express";
import emailRoutes from "./routes/email.routes";

const app = express();

app.use(express.json());
app.use("/api", emailRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});