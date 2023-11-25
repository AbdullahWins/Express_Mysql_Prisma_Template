const express = require("express");
const router = require("express").Router();

const {
  getAllGirlFriends,
  getOneGirlFriend,
  getGirlFriendsByType,
  addOneGirlFriend,
  updateGirlFriendById,
  deleteOneGirlFriendById,
} = require("../controllers/girlFriendController");

router.get("/girlfriends/all", getAllGirlFriends);
router.get("/girlfriends/find/:id", getOneGirlFriend);
router.get("/girlfriends/type/:type", getGirlFriendsByType);
router.post("/girlfriends/add", addOneGirlFriend);
router.patch("/girlfriends/update/:id", updateGirlFriendById);
router.delete("/girlfriends/delete/:id", deleteOneGirlFriendById);

module.exports = router;
