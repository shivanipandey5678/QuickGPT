import "dotenv/config";

import express from "express";
import cors from "cors";
import path from "path";

import connectDB from "./config/db.js";

import UserRouter from "./router/User.Routes.js";
import ChatRouter from "./router/Chat.Route.js";
import messageRouter from "./router/Message.Route.js";
import creditRouter from "./router/Credits.Route.js";

import { stripeWebhooks } from "./controllers/webHook.Controller.js";

const app = express();


// ================= CORS =================

const allowedOrigins = [
  "https://quick-gpt-frontend-xi.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.options("*", cors());


// ================= BODY PARSER =================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ================= STATIC =================

app.use(
  express.static(
    path.join(process.cwd(), "client/public")
  )
);


// ================= DB =================

await connectDB();


// ================= STRIPE =================

app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);


// ================= ROUTES =================

app.use("/api/user", UserRouter);

app.use("/api/chat", ChatRouter);

app.use("/api/message", messageRouter);

app.use("/api/credits", creditRouter);


// ================= HEALTH =================

app.get("/", (req, res) => {
  res.send("well - health...");
});


// ================= FAVICON =================

app.get("/favicon.ico", (req, res) => {
  res.sendFile(
    path.join(
      process.cwd(),
      "client/public",
      "favicon.ico"
    )
  );
});


// ================= 404 =================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});


// ================= ERROR =================

app.use((err, req, res, next) => {

  console.log(err);

  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});


// ================= LOCAL SERVER =================

const PORT = process.env.PORT || 8000;

if (
  process.env.NODE_ENV !== "production" ||
  process.env.VERCEL !== "1"
) {
  app.listen(PORT, () => {
    console.log(`Server live on ${PORT}`);
  });
}

export default app;
