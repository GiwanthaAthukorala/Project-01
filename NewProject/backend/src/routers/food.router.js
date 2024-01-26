import { Router } from "express";
import { sample_foods, sample_tags } from "../data";

const router = Router();

router.get("/", (req, res) => {
  res.send(sample_foods);
});

export default router;
