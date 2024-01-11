import { Router } from "express";
import { getData } from "../controllers/data";

const router = Router();

router.get("/data", getData);

export default router;
