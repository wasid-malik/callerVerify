import express from "express";

import userRoutes from "./user.route";
import contactRoutes from "./contact.route";
import userController from "../controllers/user.controller";

const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/contact", userController.authenticate, contactRoutes);

export default routes;
