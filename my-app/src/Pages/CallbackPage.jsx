


// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function CallbackPage() {
//   const { handleRedirectCallback, getAccessTokenSilently } = useAuth0();
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const { appState } = await handleRedirectCallback();

//         const token = await getAccessTokenSilently();
//         await axios.post(
//           "https://unix.up.railway.app/api/users/users",
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         navigate(appState?.returnTo || "/");
//       } catch (err) {
//         console.error("Auth0 callback failed:", err);
//         navigate("/");
//       }
//     })();
//   }, [handleRedirectCallback, getAccessTokenSilently, navigate]);

//   return <p>Loading...</p>;
// }
/////////////////////////////////////////////////////////////////////////////////

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CallbackPage() {
  const { isAuthenticated, isLoading, error, user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // Wait for Auth0 to finish processing
      if (isLoading) return;

      // Handle authentication errors
      if (error) {
        console.error("Auth0 callback error:", error);
        navigate("/login");
        return;
      }

      // Once authenticated, sync user and redirect
      if (isAuthenticated && user) {
        try {
          // Sync user with backend
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            },
          });

          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/users`,
            {
              auth0Id: user.sub,
              email: user.email,
              username: user.nickname,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          // Check if there's a stored return path
          const returnTo = sessionStorage.getItem("returnTo");
          
          if (returnTo) {
            sessionStorage.removeItem("returnTo");
            navigate(returnTo);
          } else {
            navigate("/profile");
          }
        } catch (err) {
          console.error("❌ User sync failed:", err);
          // Still navigate even if sync fails
          const returnTo = sessionStorage.getItem("returnTo");
          sessionStorage.removeItem("returnTo");
          navigate(returnTo || "/profile");
        }
      }
    };

    handleCallback();
  }, [isAuthenticated, isLoading, error, user, getAccessTokenSilently, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-500 text-xl font-semibold mb-4">❌ Authentication Error</p>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
        <p className="text-gray-700 text-xl font-medium">Completing authentication...</p>
        <p className="text-gray-500 mt-2">Please wait a moment</p>
      </div>
    </div>
  );
}