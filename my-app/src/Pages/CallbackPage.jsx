

// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CallbackPage() {
//   const { handleRedirectCallback } = useAuth0();
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       const { appState } = await handleRedirectCallback();
//       navigate(appState?.returnTo || '/');
//     })();
//   }, [handleRedirectCallback, navigate]);

//   return <p>Loading...</p>;
// }


import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CallbackPage() {
  const { handleRedirectCallback, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { appState } = await handleRedirectCallback();

        const token = await getAccessTokenSilently();
        await axios.post(
          "https://unix.up.railway.app/api/users/users",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        navigate(appState?.returnTo || "/");
      } catch (err) {
        console.error("Auth0 callback failed:", err);
        navigate("/");
      }
    })();
  }, [handleRedirectCallback, getAccessTokenSilently, navigate]);

  return <p>Loading...</p>;
}