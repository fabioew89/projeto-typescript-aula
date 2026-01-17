import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import sensorRouter from "./routes/sensorRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6060;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use('/api', sensorRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
