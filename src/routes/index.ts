import { Router } from "express";
import authRouter from "./auth";
import conferenceRouter from "./conferences";
const router = Router();

router.use("/auth", authRouter);
router.use("/conference", conferenceRouter);
export default router;
