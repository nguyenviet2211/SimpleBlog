const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./db/user");
const Post = require("./db/post");

// Kết nối đến MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
    seedDatabase();
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    // Xóa dữ liệu cũ (nếu muốn)
    // Bỏ comment dòng dưới nếu muốn xóa dữ liệu cũ trước khi thêm mới
    await User.deleteMany({});
    await Post.deleteMany({});

    // Tạo users
    const users = [
      {
        first_name: "Nguyễn",
        last_name: "Văn A",
        location: "Hà Nội",
        description: "Người dùng mẫu 1",
        occupation: "Developer",
        user_name: "admin",
        password: "admin",
      },
      {
        first_name: "Trần",
        last_name: "Thị B",
        location: "Hồ Chí Minh",
        description: "Người dùng mẫu 2",
        occupation: "Designer",
        user_name: "admin123",
        password: "admin123",
      },
      {
        first_name: "Lê",
        last_name: "Văn C",
        location: "Đà Nẵng",
        description: "Người dùng mẫu 3",
        occupation: "Project Manager",
        user_name: "admin321",
        password: "admin321",
      },
    ];

    // Lưu users vào database
    const savedUsers = [];
    for (const userData of users) {
      // Kiểm tra xem user đã tồn tại chưa
      const existingUser = await User.findOne({
        first_name: userData.first_name,
        last_name: userData.last_name,
      });

      if (!existingUser) {
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        savedUsers.push(savedUser);
        console.log(`User created: ${savedUser.first_name} ${savedUser.last_name}`);
      } else {
        savedUsers.push(existingUser);
        console.log(`User already exists: ${existingUser.first_name} ${existingUser.last_name}`);
      }
    }

    // Tạo posts
    const posts = [
      {
        slug: "mongodb-introduction",
        title: "Giới thiệu MongoDB",
        description: "MongoDB là một cơ sở dữ liệu NoSQL phổ biến, được sử dụng rộng rãi trong phát triển ứng dụng web.",
        Comments: [
          {
            user: savedUsers[0]._id,
            text: "Bài viết rất hữu ích, cảm ơn tác giả!",
          },
        ],
      },
      {
        slug: "react-vs-angular",
        title: "So sánh React và Angular",
        description: "React và Angular là hai framework JavaScript phổ biến để xây dựng giao diện người dùng. Bài viết này sẽ so sánh ưu nhược điểm của chúng.",
        Comments: [],
      },
      {
        slug: "nodejs-express",
        title: "Xây dựng API với Node.js và Express",
        description: "Hướng dẫn xây dựng REST API đơn giản sử dụng Node.js và Express framework kết nối với MongoDB.",
        Comments: [
          {
            user: savedUsers[1]._id,
            text: "Tuyệt vời, tôi đã áp dụng thành công!",
          },
          {
            user: savedUsers[2]._id,
            text: "Mong chờ phần tiếp theo của bài viết.",
          },
        ],
      },
    ];

    // Lưu posts vào database
    for (const postData of posts) {
      // Kiểm tra xem post đã tồn tại chưa
      const existingPost = await Post.findOne({ slug: postData.slug });

      if (!existingPost) {
        const newPost = new Post(postData);
        const savedPost = await newPost.save();
        console.log(`Post created: ${savedPost.title}`);
      } else {
        console.log(`Post already exists: ${existingPost.title}`);
      }
    }

    console.log("Database seeded successfully!");
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
    process.exit(1);
  }
}
