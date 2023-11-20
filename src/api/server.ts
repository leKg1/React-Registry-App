import express from "express";
import recordsRoutes from "./routes/recordsRoutes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/api/records", recordsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
