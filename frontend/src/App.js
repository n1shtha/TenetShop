import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/Home/Home.js";
import About from "./component/Home/About.js";
import Contact from "./component/Home/Contact";
import ProductDetails from "./component/Product/ProductDetails";
import LoginSignup from "./component/User/LoginSignup.js";
import store from "./store";
import Search from "./component/Product/Search.js";
import Products from "./component/Product/Products";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Wishlist from "./component/Cart/Wishlist";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails"

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

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Route path="/login" component={LoginSignup} />
      <Route path="/cart" component={Cart} />
      <Route path="/wishlist" component={Wishlist} />
      <ProtectedRoute exact path="/shipping" component={Shipping} />
      

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <ProtectedRoute exact path="/success" component={OrderSuccess} />
      <ProtectedRoute exact path="/orders" component={MyOrders} />
      <Switch>
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
      <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        </Switch>
    

      <Footer />
    </Router>
  );
}

export default App;
