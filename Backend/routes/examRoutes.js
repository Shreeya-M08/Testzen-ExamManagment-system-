const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");

router.post("/add", examController.createExam);
<<<<<<< HEAD
router.get("/all", examController.getExams);// ✅ THIS is your main list API
router.get("/:id", examController.getExam);
router.put("/:id", examController.updateExam);
=======
router.get("/all", examController.getExams);
router.get("/:id", examController.getExam);
router.put("/:id", examController.updateExam);
router.put("/:id/publish", examController.publishExam);
>>>>>>> upstream/master
router.delete("/:id", examController.deleteExam);

module.exports = router;

