import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../../models/user.model";
import { PERMISSIONS } from "../../utils/constants/permissions";
import { config } from "../../config";

async function seedAdmin() {
  try {
    // 1. Connect to DB
    await mongoose.connect(config.dbUri);
    console.log("Connected to MongoDB");

    // 2. Check if admin already exists
    const existingAdmin = await User.findOne({ username: "admin" });

    if (existingAdmin) {
      console.log("Admin already exists. Skipping seeding.");
      process.exit(0);
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(
      "Admin123!",
      Number(config.jwt.bcryptSaltRounds)
    );

    // 4. Create admin user
    const admin = new User({
      fullName: "Super Admin",
      username: "admin",
      password: hashedPassword,
      role: "admin",
      permissions: [...PERMISSIONS],
    });
    await admin.save();
    console.log("Admin created successfully:");
    console.log({
      username: admin.username,
      role: admin.role,
      permissions: admin.permissions,
    });

    process.exit(0);
  } catch (err) {
    console.error("Error seeding admin:", err);
    process.exit(1);
  }
}

seedAdmin();
