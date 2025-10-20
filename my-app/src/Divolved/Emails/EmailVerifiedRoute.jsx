
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Navbar from "../../Pages/Navbar";

const EmailVerifiedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If email is not verified, show verification required page
  if (!user?.email_verified) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
            <div className="text-yellow-500 text-6xl mb-4">📧</div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Email Verification Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please verify your email address to access this feature. Check your
              inbox for the verification link.
            </p>
            <div className="bg-gray-50 p-4 rounded mb-6">
              <p className="text-sm text-gray-600">
                Didn't receive the email?
              </p>
              <button
                onClick={() => window.location.href = "/profile"}
                className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Go to Profile to Resend
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Email: <strong>{user?.email}</strong>
            </p>
          </div>
        </div>
      </>
    );
  }

  // User is authenticated and email is verified
  return children;
};

export default EmailVerifiedRoute;