const mongoose = require("mongoose");
const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nhập danh mục"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Nhập hình ảnh"],
    trim: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Categories", categoriesSchema);
