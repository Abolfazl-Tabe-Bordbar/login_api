const express = require("express");
const router = express.Router();

const user_controller = require("./../controllers/users/user")

router.get("/record/:card_id",user_controller.new_record.bind(user_controller));



module.exports = router;