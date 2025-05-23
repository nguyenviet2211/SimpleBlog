const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./db/user");

// Kết nối đến MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
    addTestUser();
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
    process.exit(1);
  });

// Hàm thêm người dùng mẫu
async function addTestUser() {
  try {
    // Kiểm tra xem đã có người dùng admin chưa
    const existingUser = await User.findOne({ user_name: "admin" });
    
    if (existingUser) {
      console.log("User 'admin' already exists!");
      console.log("Username: admin");
      console.log("Password: admin123");
    } else {
      // Tạo người dùng mới
      const newUser = new User({
        first_name: "Admin",
        last_name: "User",
        user_name: "admin",
        password: "admin123", // Trong thực tế nên mã hóa mật khẩu
        location: "System",
        description: "System administrator",
        occupation: "Administrator"
      });
      
      // Lưu người dùng vào cơ sở dữ liệu
      await newUser.save();
      console.log("Test user created successfully!");
      console.log("Username: admin");
      console.log("Password: admin123");
    }
    
    // Đóng kết nối
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating test user:", error);
    mongoose.connection.close();
    process.exit(1);
  }
}
