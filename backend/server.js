import express from "express";
import { db } from "./config/firebaseAdmin.js"; // apenas importa, sem inicializar
import { routes } from "./routes/router.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api", routes);



const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
