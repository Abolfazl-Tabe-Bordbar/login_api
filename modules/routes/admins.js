const express = require("express");
const router = express.Router();

const controller = require("./../controllers/admins/records");



router.get("/records",controller.show.bind(controller));
router.post("/records",controller.add.bind(controller));
router.delete("/records/:record_id",controller.delete.bind(controller));


module.exports = router;