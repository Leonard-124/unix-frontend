
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const EmailVerificationBanner = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  // Don't show if email is already verified
  if (user?.email_verified) {
    return null;
  }

  const resendVerificationEmail = async () => {
    setSending(true);
    setMessage("");

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      // Call Auth0 Management API to resend verification email
      const response = await fetch(
        `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/jobs/verification-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: user.sub,
          }),
        }
      );

      if (response.ok) {
        setMessage("✅ Verification email sent! Check your inbox.");
      } else {
        setMessage("❌ Failed to send email. Please try again later.");
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      setMessage("❌ An error occurred. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-yellow-800">
              Email Verification Required
            </h3>
            <div className="mt-1 text-sm text-yellow-700">
              <p>
                Please verify your email address <strong>({user?.email})</strong> to
                access all features. Check your inbox for the verification link.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={resendVerificationEmail}
            disabled={sending}
            className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-md hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            {sending ? "Sending..." : "Resend Email"}
          </button>
        </div>
      </div>
      {message && (
        <div className="mt-3 text-sm text-yellow-700">{message}</div>
      )}
    </div>
  );
};

export default EmailVerificationBanner;