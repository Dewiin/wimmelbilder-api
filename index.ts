import express from "express";
import cors from "cors";

// routers
import { gameRouter } from "./routers/gameRouter.js";

const app = express();

const allowedOrigins = [
    'http://localhost:3000',
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

// routes
app.get("/api", (req, res) => res.json({ message: "Welcome to the API." }));
app.get("/api/game", gameRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}!`));