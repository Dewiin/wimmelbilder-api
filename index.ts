import express from "express";
import cors from "cors";

// routers
import { gameRouter } from "./routers/gameRouter";

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
];
app.use(cors({
    origin: function(origin, cb) {
        if(!origin || allowedOrigins.includes(origin)) {
            return cb(null, true);
        }
        const msg = "The CORS policy for this site does not allow access from the specified Origin."
        return cb(new Error(msg), false);
    }
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.get("/api", (req, res) => res.json({ message: "Welcome to the API." }));
app.use("/api/game", gameRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}!`));