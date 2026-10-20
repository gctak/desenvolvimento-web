const express = require("express");
const { timeStamp } = require("node:console");
const cors = require("cors");
require("./database/db");

const vagasRoutes = require("./routes/vagas.routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api/vagas", vagasRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    projeto: "DevJobs API",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/vagas", vagasRoutes);
app.listen(PORT, () => {
  console.log(`DevJobs API rodando em http://localhost:${PORT}`);
});
