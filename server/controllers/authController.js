import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";


export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, phone } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    const token = await userCreated.generateToken();

    // Send confirmation email
    const subject = "Welcome to Our App!";
    const message = `
      <p>Dear ${username},</p>
      <p>Thank you for registering with our app.</p>
      <p>Enjoy using our services!</p>
    `;
    await sendEmail(subject, message, email, process.env.EMAIL_USER, process.env.EMAIL_USER);

    res.status(201).json({
      msg: "Registration successful. Confirmation email sent.",
      token,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userExist = await User.findOne({ email });
      console.log(userExist);
  
      if (!userExist) {
        return res.status(400).json({ message: "Invalid Credentials " });
      }
  
       const user = await bcrypt.compare(password, userExist.password);
      //const user = await userExist.comparePassword(password);
  
      if (user) {
        res.status(200).json({
          msg: "Login Successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json("internal server error");
    }
  };

  // Get all users
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
  };

  export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from route parameters
        const { username, email, phone } = req.body; // Get updated user data from request body

        // Update user details in the database
        await User.findByIdAndUpdate(userId, { username, email, phone });

        res.status(200).json({ message: "User details updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete user controller function
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from route parameters

        // Delete user from the database
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: "User account deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUser = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};