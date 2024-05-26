import express from 'express';
import { registerUser, loginUser,getAllUsers,updateUser,deleteUser,getUser } from '../controllers/authController.js';
import { signupSchema,loginSchema } from '../validators/auth-validator.js';
import { validate } from '../middlewares/validator-middleware.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';

const router = express.Router();

// Register a new user
router
  .route("/register")
  .post(validate(signupSchema), registerUser);

// Login existing user
router.route("/login").post(validate(loginSchema), loginUser);

// Get all users
router.get('/users', getAllUsers);
//router.route("/").get(authMiddleware, getAllUsers);

// Update user route
router.put('/:id/update', updateUser);

// Delete user route
router.delete('/:id/delete', deleteUser);
router.route("/user").get(authMiddleware, getUser);


export default router;