import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from "../reducers/productReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "../reducers/userReducer";

import { cartReducer } from "../reducers/cartReducer";
import {
  allOrdersReducer,
  allRevenueReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "../reducers/orderReducer";
import {
  allOrdersSysReducer,
  newOrderSysReducer,
  orderSysDetailsReducer,
  orderSysReducer,
  myOrdersSysReducer,
} from "../reducers/orderSysReducer";
import {
  allFeedbackReducer,
  newFeedbackReducer,
  feedbackReducer,
} from "../reducers/feedbackReducer";
import {
  newNewFeedReducer,
  newFeedDetailsReducer,
  newFeedReducer,
  newFeedsReducer,
} from "../reducers/newFeedReducer";
import {
  newCouponReducer,
  couponDetailsReducer,
  couponReducer,
  couponsReducer,
} from "../reducers/couponReducer";
import {
  allSupplierReducer,
  newSupplierReducer,
  supplierReducer,
} from "../reducers/supplierReducer";
import {
  allBrandReducer,
  newBrandReducer,
  brandReducer,
} from "../reducers/brandReducer";
import {
  allCategoriesReducer,
  newCategoriesReducer,
  categoriesReducer,
} from "../reducers/categoriesReducer";
import {
  allBannerReducer,
  newBannerReducer,
  bannerReducer,
} from "../reducers/bannerReducer";
import {
  newStatisticalReducer,
  statisticalDetailsReducer,
  statisticalReducer,
  statisticalsReducer,
} from "../reducers/statisticalReducer";
const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  allRevenue: allRevenueReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  allBrand: allBrandReducer,
  newBrand: newBrandReducer,
  brand: brandReducer,
  allBanner: allBannerReducer,
  newBanner: newBannerReducer,
  banner: bannerReducer,
  allSupplier: allSupplierReducer,
  newSupplier: newSupplierReducer,
  supplier: supplierReducer,
  allCategories: allCategoriesReducer,
  newCategories: newCategoriesReducer,
  categories: categoriesReducer,
  newStatistical: newStatisticalReducer,
  statisticalDetails: statisticalDetailsReducer,
  statistical: statisticalReducer,
  statisticals: statisticalsReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  newOrderSystem: newOrderSysReducer,
  orderSystemDetails: orderSysDetailsReducer,
  allOrderSystem: allOrdersSysReducer,
  orderSystem: orderSysReducer,
  myOrdersSys: myOrdersSysReducer,
  allFeedback: allFeedbackReducer,
  newFeedback: newFeedbackReducer,
  feedback: feedbackReducer,
  newNewFeed: newNewFeedReducer,
  newFeedDetails: newFeedDetailsReducer,
  newFeed: newFeedReducer,
  newFeeds: newFeedsReducer,
  newCoupon: newCouponReducer,
  couponDetails: couponDetailsReducer,
  coupon: couponReducer,
  coupons: couponsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  whitelist: {
    whiteListItems: localStorage.getItem("whiteListItems")
      ? JSON.parse(localStorage.getItem("whiteListItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
