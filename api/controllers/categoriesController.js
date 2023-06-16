const Categories = require("../models/categoriesModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const categories = await Categories.create(req.body);
  res.status(201).json({
    success: true,
    categories,
  });
});

// Get All
exports.getCategory = catchAsyncErrors(async (req, res, next) => {
  const categories = await Categories.find();

  res.status(200).json({
    success: true,
    categories,
  });
});
// update
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  const newData = {
    name: req.body.name,
  };
  const categories = await Categories.findById(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    categories,
  });
});

// Delete Orders

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const categories = await Categories.findById(req.params.id);

  if (!categories) {
    return next(new ErrorHander("Không tìm thấy danh mục", 404));
  }
  await categories.remove();

  res.status(200).json({
    success: true,
    message: "Xóa danh mục thành công !",
  });
});
