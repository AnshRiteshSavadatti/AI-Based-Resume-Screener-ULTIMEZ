import express from "express";
import path from "path";

import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import connnectToDatabase from "./database/mongodb.js";

const app = express();
const PORT = 5000;

connnectToDatabase();

const __dirname = path.resolve();

const allowedOrigins = [
  "https://ai-based-resume-screener-ultimez.vercel.app",
  "http://localhost:5173",
];

// For development, allow all origins by commenting out origin check
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Allow all origins for development
      return callback(null, true);
      // return callback(new Error("Not allowed by CORS"));
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Add allowed methods
    allowedHeaders: "Content-Type, Authorization", // Add allowed headers
    credentials: true, // If you need to support cookies or authentication
  })
);

// Handle preflight OPTIONS requests globally
app.options(
  "*",
  (req, res, next) => {
    console.log("Received OPTIONS request for:", req.headers.origin);
    next();
  },
  cors()
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all registered routes
function printRoutes(stack, prefix = "") {
  stack.forEach((layer) => {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods)
        .map((m) => m.toUpperCase())
        .join(", ");
      console.log(`Route: ${prefix}${layer.route.path} [${methods}]`);
    } else if (layer.name === "router" && layer.handle.stack) {
      printRoutes(
        layer.handle.stack,
        prefix +
          (layer.regexp.source === "^\\/?$"
            ? ""
            : layer.regexp.source
                .replace("\\/?", "")
                .replace("^", "")
                .replace("$", ""))
      );
    }
  });
}

// console.log("Registered routes:");
// printRoutes(app._router.stack);

app.use("/api/auth", authRouter);
app.use("/api", uploadRouter);

// Log all registered routes after route registration
console.log("Registered routes:");
printRoutes(app._router.stack);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

app.use((err, req, res, next) => {
  console.error("Error handler caught:", err.stack);
  res.status(500).json({ error: err.message || "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// export default app;
