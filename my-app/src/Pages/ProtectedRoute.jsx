

// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect } from "react";

// export default function ProtectedRoute({ children }) {
//   const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       loginWithRedirect({
//         appState: { returnTo: window.location.pathname }
//       });
//     }
//   }, [isLoading, isAuthenticated, loginWithRedirect]);

//   if (isLoading) return <p>Loading...</p>;

//   return isAuthenticated ? children : null;
// }

///////////////////////////////////////////////////////////////////////

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only redirect once and when not loading
    if (!isLoading && !isAuthenticated && !hasRedirected.current) {
      hasRedirected.current = true;
      
      // Save the full path including query params
      const returnPath = location.pathname + location.search;
      sessionStorage.setItem("returnTo", returnPath);
      
      loginWithRedirect({
        appState: { returnTo: returnPath }
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, location]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-700 text-xl font-medium">Checking authentication...</p>
          <p className="text-gray-500 mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show redirecting message
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-700 text-xl font-medium">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // User is authenticated, render the protected component
  return children;
}