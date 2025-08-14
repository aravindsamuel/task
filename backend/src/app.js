import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import User from "./models/user.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const app = express();

app.use(cors({
  origin: process.env.APP_URL || "http://localhost:5173",
  credentials: true
}));
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);


app.get("/", authMiddleware, async (req, res) => {

  res.json({
    company: "Construction Site",
    intro: "Welcome to the protected construction landing page!",
    services: [
      "Residential Construction",
      "Commercial Buildings",
      "Renovations",
      "Project Management"
    ],
    user: req.user
  });
});


app.get("/health", (req, res) => res.json({ ok: true }));


const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    await sequelize.sync(); // in prod use migrations
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error("Failed to start", err);
    process.exit(1);
  }
})();
