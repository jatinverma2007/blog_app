import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
import commentRoute from "./routes/comment.route.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://blog-app-94fk.onrender.com",
    "https://blog-app-2-one.vercel.app",
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_2
].flatMap((origin) => origin?.split(",") ?? [])
    .map((origin) => origin.trim())
    .filter(Boolean);

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))

const backendDirectory = path.dirname(fileURLToPath(import.meta.url))
const frontendDist = path.resolve(backendDirectory, "../frontend/dist")

// apis
app.get("/healthz", (_, res) => {
    res.status(200).json({ status: "ok" })
})

app.use("/api/v1/user", userRoute)
app.use("/api/v1/blog", blogRoute)
app.use("/api/v1/comment", commentRoute)

app.use("/api", (_, res) => {
    res.status(404).json({ success: false, message: "API route not found" })
})

app.use(express.static(frontendDist))
app.get("*", (_, res) => {
    res.sendFile(path.join(frontendDist, "index.html"))
})

const startServer = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI environment variable is required")
    }
    if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY environment variable is required")
    }

    await connectDB()
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

startServer().catch((error) => {
    console.error("Failed to start server:", error)
    process.exit(1)
})