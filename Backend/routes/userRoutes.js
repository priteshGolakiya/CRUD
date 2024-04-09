const express = require("express");
const router = express.Router();

const {
  getAllusers,
  getuser,
  adduser,
  updateuser,
  deleteuser,
} = require("../controllers/userController");

router.get("/", getAllusers);
router.get("/:id", getuser); // Added leading /
router.post("/", adduser);
router.put("/:id", updateuser); // Added leading /
router.delete("/:id", deleteuser); // Added leading /

module.exports = router;
