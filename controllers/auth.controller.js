import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";

export const register = async (req, res) => {
    const { firstname, middlename, lastname, email, password, role } = req.body;
    try {
        if (!firstname || !lastname || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 8) {
            return res.status(401).json({ message: "Password must be at least 8 characters" });
        }


        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(401).json({ message: "Email already Exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role,
        });
        const userResponse = { ...newUser._doc };
        delete userResponse.password;


        if (userResponse) {

            //generate token
            generateToken(newUser, res);
            await newUser.save();
            return res.status(201).json({ message: "User Registered Successfully", user: userResponse });
        }
        else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }

};


export const login = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        if (role !== user.role) {
            return res.status(403).json({ message: "User not found with this Role!" });
        }
        //removing password for safety
        const userResponse = { ...user._doc };
        delete userResponse.password;
        generateToken(user, res);
        res.status(201).json({ message: "User Logged in Successfully", user: userResponse });

    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const userlogout = async (req, res) => {
    try {
        res.clearCookie("userToken", " ", {
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });
        res.status(200).json({ message: "User Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

};

export const adminlogout = async (req, res) => {
    try {
        res.clearCookie("adminToken", " ", {
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });
        res.status(200).json({ message: "Admin Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

};

export const getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User found!", user });
    } catch (error) {
        console.log("Error in fetching user details", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateOwnProfile = async (req, res) => {
    try {
        const { firstname, middlename, lastname } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "user/Admin not found" });
        }

        if (firstname) user.firstname = firstname;
        if (middlename !== undefined) user.middlename = middlename;
        if (lastname) user.lastname = lastname;

        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.log("Error in updating profile", error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export const updateAnyProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, middlename, lastname } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (firstname) user.firstname = firstname;
        if (middlename !== undefined) user.middlename = middlename;
        if (lastname) user.lastname = lastname;

        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.log("Error in admin updating profile", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log("Error in fetching all Users", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

}