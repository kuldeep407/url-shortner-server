import express from "express";
import { userAuth } from "../middleware/userAuth.js";

import {
  redirectAndLog,
  searchLink,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.route("/redirect-and-log/:shortId").post(userAuth, redirectAndLog);
router.route("/search-link").get(userAuth, searchLink);

export default router;
