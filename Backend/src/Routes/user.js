const express = require("express");

const {
  registerUser,
  loginUser,
  logOutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUserDetails,
  deleteUserProfile,
  updateUserRole,
  getSingleUser,
  getUserDetailsA,
} = require("../Controllers/userController");
const { isAuthenticated, authorizedRoles } = require("../Middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/details").get(isAuthenticated, getUserDetailsA);

router.route("/login").post(loginUser);
router.route("/password/forgot/").post(forgotPassword);
router.route("/password/update").put(isAuthenticated, updateUserPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/verify").get(isAuthenticated, getUserDetails);
router.route("/me/update").put(isAuthenticated, updateUserProfile);
router
  .route("/admin/alluser")
  .get(isAuthenticated, authorizedRoles("lendingPartner"), getAllUserDetails);
router
  .route("/admin/users/:id")
  .get(isAuthenticated, authorizedRoles("lendingPartner"), getSingleUser)
  .put(isAuthenticated, authorizedRoles("lendingPartner"), updateUserRole)
  .delete(isAuthenticated, authorizedRoles("lendingPartner"), deleteUserProfile);

router.route("/logout").get(logOutUser);
module.exports = router;
