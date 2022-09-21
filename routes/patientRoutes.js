const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

router.get("/", patientController.patient_list);
router.post("/add", patientController.patient_create_post);
router.get("/:id", patientController.patient_details);
router.patch("/:id", patientController.patient_update);
router.delete("/:id", patientController.patient_delete);

module.exports = router;
