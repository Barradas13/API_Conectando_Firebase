import express from "express";
import {getAll, getById, create, update, remove} from "../controllers/pessoaController.js"

const routes = express.Router();

routes.get("/pessoas", getAll);
routes.get("/pessoas/:id", getById);
routes.post("/pessoas", create);
routes.put("/pessoas/:id", update);
routes.delete("/pessoas/:id", remove);

export { routes };