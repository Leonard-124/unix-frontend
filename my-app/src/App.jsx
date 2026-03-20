
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import AdminPanel from "./Components/Security/AdminPanel";
import axios from "axios";
import Home from "./Components/Home";
import Davinci from "./Components/Davinci";
import Explore from "./Components/Explore/Explore";
import Shop from "./Components/Shop";
//import SignUp from "./Components/Security/SignUp";
//import Login from "./Components/Security/Login";
import Logout from "./Components/Security/Logout";
import UserProfile from "./Components/Security/UserProfile";
import ProtectedRoute from "./Pages/ProtectedRoute";
import CallbackPage from "./Pages/CallbackPage";
import Post from "./Divolved/Post";
import Crypto from "./Pages/Crypto";
import Card1 from "./Divolved/Blogs/Card1";
import Card2 from "./Divolved/Blogs/Card2";
import Card3 from "./Divolved/Blogs/Card3";
import Card4 from "./Divolved/Blogs/Card4";
import Buy from "./Divolved/Buy";
import Collect from "./Divolved/collect/Collect";
import Artcard from "./Divolved/collect/Artcard";
import Inventions from "./Divolved/Inventions";
import Card from "./Divolved/collect/Card";
import Cardo from "./Divolved/collect/Cardo";
import Artistinventor from "./Divolved/Artistinventor";
//import Artinvent from "./Divolved/Artinvent";
import Whatsnew from "./Divolved/Whatsnew";
import Photography from "./Divolved/Photography"; 
import Editorial from "./Divolved/Editorial";
import Artworks from "./Divolved/Artworks";
import Artworkscard from "./Divolved/collect/Artworkscard";
import Categories from "./Shop/Categories/Categories";
import Cart from "./Shop/Cart/Cart";
import Product from "./Shop/Productcard/Product";
import ProductCard from "./Shop/Productcard/ProductCard";
import Coming_soon from "./Components/Waste/Coming_soon"
import Checkout from "./Shop/Cart/Checkout/Checkout";
import Gigc from "./Shop/Art/Gigc";
import View from "./Pages/View";
import Search from "./Divolved/Search";
//import Checkoutnow from "./Shop/Art/checkoutnow";
import Inventioncollect from "./Divolved/collect/Inventioncollect";
import Artpost from "./Components/Explore/Artacc/Artpost";
import Trade from "./Components/Explore/Tradeacc/Trade";
import Paystackredirect from "./Divolved/collect/Paystackredirect";
import Success from "./Shop/Cart/Success";
import Paymentfail from "./Shop/Cart/ProductList/Paymentfail";
import Order from "./Divolved/Orders/Order"
import Posted from "./Divolved/Orders/Posted";
import CreatorProfile from "./Components/CreatorProfile";
import Messages from "./Components/Messages";
import Collectionlist from "./Divolved/collect/Collectionlist";
import PaystackRedirect2 from "./Divolved/collect/Paystackredirect2";
import Wishlist from "./Divolved/collect/Wishlist";
const App = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  // Auto-sync user to MongoDB after login/signup
  useEffect(() => {
    const syncUser = async () => {
      try {
        const token = await getAccessTokenSilently();
        await axios.post(
          "https://unix.up.railway.app/api/users/users",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("User sync failed:", err);
      }
    };

    if (isAuthenticated && user) {
      syncUser();
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    <Routes>
      {/* Public routes */}
      <Route index element={<Home />} />
      <Route path="/davinci" element={<Davinci />} />
      <Route path="/Explore" element={<Explore />} />
      <Route path="trade" element={<Trade />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/productcard" element={<ProductCard />}>
        <Route path="/productcard/product/:id" element={<Product />} />
      </Route>
      <Route path="Categories" element={<Categories />} />
      <Route path="artspost" element={<Artpost />} />
      <Route path="gigcard/:id" element={<Gigc />} />
      {/* <Route path="checkout/:id" element={<Checkoutnow />} /> */}
      <Route path="Cart" element={<Cart />} />
      <Route path="/success" element={<Success />} />
      <Route path="/failure" element={<Paymentfail />} />
      {/* <Route path="/SignUp" element={<SignUp />} /> */}
      <Route path="/logout" element={< Logout />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/Crypto" element={<Crypto />} />
      <Route path="/ComingSoon" element={<Coming_soon />} />
      <Route path="/best_art" element={<Card1 />} />
      <Route path="/top_best" element={<Card2 />} />
      <Route path="/best_inventions" element={<Card3 />} />
      <Route path="/why_choose_art&=?design" element={<Card4 />} />
      <Route path="/inventions" element={<Inventions />} />
      <Route path="/view/:id" element={<View />} />
      <Route path="/artistinventor" element={<Artistinventor />} />
      <Route path="/whats-new" element={<Whatsnew />} />
      <Route path="/photography" element={<Photography />} />
      <Route path="/editorial" element={<Editorial />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/artworks" element={<Artworks />} />
      <Route path="/search" element={<Search />} />
      <Route path="/creator/:username" element={<CreatorProfile />} />
      {/* <Route path="/paystack-redirect" element={<Paystackredirect />} /> */}

      {/* Auth0 callback route */}
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/admin" element={<AdminPanel />} />

      {/* Protected routes */}
      <Route path="/Checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/post" element={<ProtectedRoute><Post /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
      <Route path="/buy/:id" element={<ProtectedRoute><Collect /></ProtectedRoute>} />
      <Route path="/art/:id" element={<ProtectedRoute><Artcard /></ProtectedRoute>} />
      <Route path="/artworkscard/:id" element={<ProtectedRoute><Artworkscard /></ProtectedRoute>} />
      {/* <Route path="/premium-service" element={<ProtectedRoute><Artinvent /></ProtectedRoute>} /> */}
      <Route path="/invention/:id" element={<ProtectedRoute><Inventioncollect /></ProtectedRoute>} />
      <Route path="/paystack-redirect" element={<ProtectedRoute><Paystackredirect /></ProtectedRoute>} />
      <Route path="/paystack-redirect2" element={<ProtectedRoute><PaystackRedirect2 /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><Order /></ProtectedRoute>} />
      <Route path="/inventioncard/:id" element={<ProtectedRoute><Card /></ProtectedRoute>} />
      <Route path="/artworks/:id" element={<ProtectedRoute><Cardo /></ProtectedRoute>} />
      <Route path="/myworks" element={<ProtectedRoute><Posted /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      <Route path="/collections" element={<ProtectedRoute><Collectionlist /></ProtectedRoute>} />
       <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />

      {/* 404 */}
      <Route path="*" element={<h1 className="text-center text-2xl font-mono">Page Not Found</h1>} />
    </Routes>
  );
};

export default App;