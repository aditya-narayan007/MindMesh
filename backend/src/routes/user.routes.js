import express from "express";
import { register } from "../controllers/user.controller.js";

const router = express.Router();


router.route("/login");
router.route("/register").post(register);
router.route("/add_to_activity");
router.route("/get_all_activity");

export default router;