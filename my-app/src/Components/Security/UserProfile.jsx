

// import React, { useEffect, useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import axios from "axios";
// import Navbar from "../../Pages/Navbar";
// //import PaystackButton from "../../Divolved/PaystackButton"; // ✅ uncommented
// import { Link } from "react-router-dom";

// const UserProfile = () => {
//   const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const syncAndFetchProfile = async () => {
//       try {
//         const token = await getAccessTokenSilently();

//         // 🔹 1. Sync user with backend (create or update in DB)
//         await axios.post(
//           "http://localhost:3000/api/users/users",
//           {
//             auth0Id: user.sub, // ✅ send actual user ID
//             email: user.email,
//             username: user.nickname,
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         // 🔹 2. Fetch profile after sync
//         const res = await axios.get(
//           `http://localhost:3000/api/users/users/${user.sub}`, // ✅ dynamic ID
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setProfile(res.data);
//       } catch (err) {
//         console.error("❌ Error syncing/fetching profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isAuthenticated) syncAndFetchProfile();
//   }, [isAuthenticated, getAccessTokenSilently, user]);

//   if (!isAuthenticated) {
//     return <p className="text-center mt-10">Please log in</p>;
//   }

//   if (loading) {
//     return <p className="text-center mt-10">Loading profile...</p>;
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow">
//         <h2 className="text-xl font-bold mb-4">Welcome to Unix</h2>
//         <p>
//           <strong>Username:</strong> {profile?.username || user.nickname}
//         </p>
//         <p>
//           <strong>Email:</strong> {profile?.email || user.email}
//         </p>
//         <Link to='/orders' className="bg-red-400 rounded p-1 shadow">Check Your Orders</Link>
//       </div>

//       <div className="max-w-md mx-auto mt-6 p-6 bg-gray-50 rounded shadow text-center">
//         <p className="mb-4">
//           {`Hello ${user.nickname}, to continue posting your artworks and inventions click the Get Started button below.`}
//         </p>
//         {/* <PaystackButton user={user} /> ✅ now properly imported */}
//         <Link to="/post" className="bg-red-300 p-2 rounded shadow hover:bg-red-200">Get Started</Link>
//       </div>
//     </>
//   );
// };

// export default UserProfile;
/////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Navbar from "../../Pages/Navbar";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncAndFetchProfile = async () => {
      try {
        const token = await getAccessTokenSilently();

        // 1. Sync user with backend
        await axios.post(
          "https://unix.up.railway.app/api/users/users",
          {
            auth0Id: user.sub,
            email: user.email,
            username: user.nickname,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // 2. Fetch profile after sync
        const res = await axios.get(
          `https://unix.up.railway.app/api/users/users/${user.sub}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setProfile(res.data);
      } catch (err) {
        console.error("❌ Error syncing/fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) syncAndFetchProfile();
  }, [isAuthenticated, getAccessTokenSilently, user]);

  if (!isAuthenticated) {
    return <p className="text-center mt-10 text-lg">Please log in</p>;
  }

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading profile...</p>;
  }

  return (
    <>
      <Navbar />

      <div className="mt-24 px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Welcome to Unix 🎨
          </h2>

          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">Username:</span>{" "}
              {profile?.username || user.nickname}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {profile?.email || user.email}
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              to="/orders"
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
            >
              Check Your Orders
            </Link>
          </div>
        </div>

        {/* Action Card */}
        <div className="max-w-2xl mx-auto mt-8 bg-gray-50 rounded-lg shadow-md p-6 sm:p-8 text-center">
          <p className="mb-6 text-gray-700 text-base sm:text-lg">
            {`Hello ${user.nickname}, to continue posting your artworks and inventions, click the button below.`}
          </p>

          {/* Future: <PaystackButton user={user} /> */}
          <Link
            to="/post"
            className="bg-red-400 text-white px-5 py-2 rounded shadow hover:bg-red-500 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
