const router = require("express").Router();
const { authenticateToken } = require("../middlewares/AuthorizeAdmin");

const {
  getAllAdmins,
  getOneAdmin,
  getAdminsByType,
  RegisterAdmin,
  LoginAdmin,
  sendPasswordResetLink,
  updateAdminPasswordByEmail,
  updateAdminById,
  updateAdminPasswordByOldPassword,
  deleteAdminById,
} = require("../controllers/adminController");

router.get("/admins/all", authenticateToken, getAllAdmins);
router.get("/admins/find/:id", authenticateToken, getOneAdmin);
router.get("/admins/types/:typeName", authenticateToken, getAdminsByType);
router.post("/admins/register", RegisterAdmin);
router.post("/admins/login", LoginAdmin);
router.post("/admins/reset", sendPasswordResetLink);
router.patch("/admins/reset", updateAdminPasswordByEmail);
router.patch("/admins/update/:id", authenticateToken, updateAdminById);
router.patch("/admins/resetpassword/:email", updateAdminPasswordByOldPassword);
router.delete("/admins/delete/:id", deleteAdminById);

module.exports = router;
