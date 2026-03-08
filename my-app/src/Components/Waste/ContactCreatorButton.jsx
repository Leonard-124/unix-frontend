import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ContactCreatorButton = ({ creatorId, artworkId, creatorName }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleContact = () => {
    if (!isAuthenticated) {
      // Save intended action and redirect to login
      sessionStorage.setItem("returnTo", `/messages?userId=${creatorId}&artworkId=${artworkId}`);
      loginWithRedirect();
      return;
    }

    // Navigate to messages with pre-filled recipient
    navigate(`/messages?userId=${creatorId}&artworkId=${artworkId}`);
  };

  return (
    <button
      onClick={handleContact}
      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      Contact {creatorName ? creatorName : "Creator"}
    </button>
  );
};

export default ContactCreatorButton;