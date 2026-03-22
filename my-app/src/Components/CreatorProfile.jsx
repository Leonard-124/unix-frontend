import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Navbar from "../Pages/Navbar";
import Footer from "../Components/Footer";

const CreatorProfile = () => {
  const { username } = useParams();
  const { isAuthenticated, getAccessTokenSilently, user, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchCreatorProfile();
  }, [username]);

  useEffect(() => {
    if (creator) {
      setShareUrl(`${window.location.origin}/creator/${creator.username}`);
    }
  }, [creator]);

  useEffect(() => {
    if (isAuthenticated && creator) {
      checkFollowStatus();
    }
  }, [isAuthenticated, creator]);

  const fetchCreatorProfile = async () => {
    try {
      // Fetch all users
      const usersRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/all`
      );

      // Find creator by username
      const users = usersRes.data.users || usersRes.data;
      const foundCreator = users.find(
        (u) => u.username?.toLowerCase() === username.toLowerCase()
      );

      if (!foundCreator) {
        setError("Creator not found");
        setLoading(false);
        return;
      }

      // Fetch all artworks
      const artworksRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/art`
      );

      // Filter creator's artworks
      const creatorArtworks = artworksRes.data.filter(
        (art) => art.auth0Id === foundCreator.auth0Id
      ); ///

      // Determine creator type
      const hasArtwork = creatorArtworks.some(
        (art) => art.type && art.type.toLowerCase() !== "invention"
      );//
      const hasInvention = creatorArtworks.some(
        (art) => art.type && art.type.toLowerCase() === "invention"
      );

      let creatorType = "artist";
      if (hasInvention && hasArtwork) {
        creatorType = "both";
      } else if (hasInvention) {
        creatorType = "inventor";
      }

      setCreator({
        ...foundCreator,
        creatorType,
        followerCount: foundCreator.followers ? foundCreator.followers.length : 0,
        followingCount: foundCreator.following ? foundCreator.following.length : 0,
      });
      setArtworks(creatorArtworks);
    } catch (err) {
      console.error("Error fetching creator:", err);
      setError("Failed to load creator profile");
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/follow/status/${creator.auth0Id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsFollowing(res.data.isFollowing);
    } catch (err) {
      console.error("Error checking follow status:", err);
    }
  };

  const handleFollow = async () => {
    if (!isAuthenticated) {
      alert("Please login to follow this creator");
      return;
    }

    setFollowLoading(true);

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/follow`,
        { targetUserId: creator.auth0Id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsFollowing(res.data.isFollowing);
      setCreator({
        ...creator,
        followerCount: res.data.followerCount,
      });
    } catch (err) {
      console.error("Error following creator:", err);
      alert("Failed to update follow status");
    } finally {
      setFollowLoading(false);
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContactCreator = () => {
    if (!isAuthenticated) {
      // Save intended action and redirect to login
      sessionStorage.setItem("returnTo", `/messages?userId=${creator.auth0Id}`);
      loginWithRedirect();
      return;
    }

    // Navigate to messages with pre-filled recipient
    navigate(`/messages?userId=${creator.auth0Id}`);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-700 text-xl font-medium">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !creator) {
    return (
      <>
        <Navbar />
        <div className="mt-24 px-4 max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-600 text-xl mb-4">❌ {error || "Creator not found"}</p>
            <Link
              to="/artistinventor"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Browse All Creators
            </Link>
          </div>
        </div>
      </>
    );
  }

  const isOwnProfile = user?.sub === creator.auth0Id;

  return (
    <>
      <Navbar />
      <div className="mt-24 px-4 sm:px-6 lg:px-12 mb-10">
        {/* Creator Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {creator.avatar ? (
                  <img
                    src={creator.avatar}
                    alt={creator.username}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-xl">
                    {creator.username?.[0].toUpperCase() || "?"}
                  </div>
                )}
              </div>

              {/* Creator Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {creator.fullname || creator.username || "Anonymous"}
                  </h1>
                  <div className="flex gap-2 justify-center md:justify-start flex-wrap">
                    {(creator.creatorType === "artist" || creator.creatorType === "both") && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        🎨 Artist
                      </span>
                    )}
                    {(creator.creatorType === "inventor" || creator.creatorType === "both") && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        🔧 Inventor
                      </span>
                    )}
                  </div>
                </div>

                {creator.username && (
                  <p className="text-lg text-gray-600 mb-3">@{creator.username}</p>
                )}

                {creator.bio && (
                  <p className="text-gray-700 italic mb-4 max-w-2xl">"{creator.bio}"</p>
                )}

                {/* Stats */}
                <div className="flex gap-6 justify-center md:justify-start text-base text-gray-600 mb-6">
                  <div>
                    <span className="font-semibold text-gray-800 text-lg">
                      {artworks.length}
                    </span>{" "}
                    {artworks.length === 1 ? "Work" : "Works"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 text-lg">
                      {creator.followerCount || 0}
                    </span>{" "}
                    {creator.followerCount === 1 ? "Follower" : "Followers"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 text-lg">
                      {creator.followingCount || 0}
                    </span>{" "}
                    Following
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center md:justify-start flex-wrap">
                  {/* Contact Button */}
                  {!isOwnProfile && (
                    <button
                      onClick={handleContactCreator}
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
                      Contact Creator
                    </button>
                  )}

                  {/* Follow Button */}
                  {!isOwnProfile && isAuthenticated && (
                    <button
                      onClick={handleFollow}
                      disabled={followLoading}
                      className={`px-6 py-3 rounded-lg font-medium transition ${
                        isFollowing
                          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {followLoading ? "..." : isFollowing ? "Following" : "Follow"}
                    </button>
                  )}

                  {/* Share Button */}
                  <button
                    onClick={copyShareLink}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        ✓ Copied!
                      </>
                    ) : (
                      <>
                        🔗 Share Profile
                      </>
                    )}
                  </button>
                </div>

                {/* Share URL Display */}
                {isOwnProfile && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2 font-medium">
                      📢 Your shareable profile link:
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="flex-1 px-3 py-2 border rounded bg-gray-50 text-sm"
                      />
                      <button
                        onClick={copyShareLink}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Share this link with clients to showcase your work!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Works Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Works by {creator.username || "this creator"}
          </h2>

          {artworks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {artworks.map((artwork) => (
                <Link
                  key={artwork._id}
                  to={
                    artwork.type?.toLowerCase() === "invention"
                      ? `/inventioncard/${artwork._id}`
                      : `/artworks/${artwork._id}`
                  }
                  className="group bg-white rounded-lg overflow-hidden hover:shadow-xl transition"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 truncate">
                      {artwork.name}
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      {artwork.size && <p className="truncate">Size: {artwork.size}</p>}
                      {artwork.type && <p className="truncate">Type: {artwork.type}</p>}
                      {artwork.price && (
                        <p className="font-semibold text-blue-600 text-base">
                          {artwork.price}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">No works available yet</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreatorProfile;