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
  getSingleUser
} = require("../Controllers/userController");
const { isAuthenticated, authorizedRoles } = require("../Middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot/").post(forgotPassword);
router.route("/password/update").put(isAuthenticated, updateUserPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/me/update").put(isAuthenticated, updateUserProfile);
router
  .route("/admin/alluser")
  .get(isAuthenticated, authorizedRoles("admin"), getAllUserDetails);
router
  .route("/admin/users/:id")
  .get(isAuthenticated, authorizedRoles("admin"), getSingleUser)
  .put(isAuthenticated, authorizedRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteUserProfile);

router.route("/logout").get(logOutUser);
module.exports = router;
