// recordsRoutes.ts
import express from "express";
import {
  getAllRecords,
  createRecord,
  updateRecord,
  deleteRecord,
  getRecordById,
} from "../controllers/recordsController";

const router = express.Router();

router.get("/", getAllRecords);
router.get("/:id", getRecordById);
router.post("/", createRecord);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export default router;
