import express from "express";
import { userAuth } from "../middleware/userAuth.js";

import {
  createShortLink,
  getShortLinks,
} from "../controllers/linkController.js";

const router = express.Router();

router.route("/create-short-link").post(userAuth, createShortLink);
router.route("/get-short-links").get(userAuth, getShortLinks);

export default router;
