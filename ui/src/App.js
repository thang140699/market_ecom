import "./App.css";
import "./assets/css/custom.css";

import HomePageLayout from "./layouts/HomePageLayout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Products from "./pages/home/products";
import Cart from "./pages/home/cart";
import Checkout from "./pages/home/checkout";
import ProductDetail from "./pages/home/products/ProductDetail";
import Login from "./pages/auth";
import Dashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadUser } from "./actions/userAction";
import store from "./store";
import axios from "axios";
import ProtectedRoute from "./layouts/ProtectedRoute";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import WhiteList from "./pages/home/whitelist";
import Supplier from "./pages/admin/Supplier";
import AdminOrdersPage from "./pages/admin/orders";
import Brand from "./pages/admin/brand";
import Sidebar from "./pages/admin/sidebar";
import Categories from "./pages/admin/categories";
import Banners from "./pages/admin/banners";
import Feedback from "./pages/admin/feedback/Feedback";
import User from "./pages/admin/user";
import ResetPassword from "./pages/auth/ResetPassword";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      {/* {isAuthenticated} */}
      <Switch>
        {/* <Route exact path="/admin">
          <AdminLayout />
        </Route> */}
        <Route
          exact
          path={[
            "/admin",
            "/admin/dashboard",
            "/admin/products",
            "/admin/supplier",
            "/admin/orders",
            "/admin/brands",
            "/admin/sidebar",
            "/admin/categories",
            "/admin/banners",
            "/admin/feedbacks",
            "/admin/users",
          ]}
        >
          <AdminLayout>
            <ProtectedRoute
              isAdmin={true}
              exact
              path="/admin/dashboard"
              component={Dashboard}
            />
            <ProtectedRoute
              isAdmin={true}
              exact
              path="/admin/products"
              component={AdminProducts}
            />
            <ProtectedRoute
              isAdmin={true}
              exact
              path="/admin/supplier"
              component={Supplier}
            />
            <ProtectedRoute
              isAdmin={true}
              exact
              path="/admin/feedbacks"
              component={Feedback}
            />
            <ProtectedRoute
              isAdmin={true}
              exact
              path="/admin/sidebar"
              component={Sidebar}
            />
            <ProtectedRoute
              isAdmin={true}
              exact
              path="/admin/categories"
              component={Categories}
            />
            <ProtectedRoute
              isAdmin={true}
              exact
              path="/admin/banners"
              component={Banners}
            />
            <ProtectedRoute
              isAdmin={true}
              exact
              path="/admin/brands"
              component={Brand}
            />
            <ProtectedRoute
              isAdmin={true}
              exact
              path="/admin/orders"
              component={AdminOrdersPage}
            />
            <ProtectedRoute
              isAdmin={true}
              exact
              path="/admin/users"
              component={User}
            />
          </AdminLayout>
        </Route>
        <Route exact path="/">
          <HomePageLayout />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/product/:id">
          <ProductDetail />
        </Route>
        <Route exact path="/product">
          <ProductDetail />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <ProtectedRoute exact path="/whitelist">
          <WhiteList />
        </ProtectedRoute>
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/checkout" component={Checkout} />
          </Elements>
        )}

        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
