import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Navbar from "../Pages/Navbar";
import Footer from "../Components/Footer";

const Artistinventor = () => {
  const { isAuthenticated, getAccessTokenSilently, user, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [expandedCreator, setExpandedCreator] = useState(null);
  const [followStatus, setFollowStatus] = useState({});
  const [followLoading, setFollowLoading] = useState({});

  useEffect(() => {
    fetchCreators();
  }, []);

  // Fetch follow status for all creators when authenticated
  useEffect(() => {
    if (isAuthenticated && creators.length > 0) {
      fetchAllFollowStatus();
    }
  }, [isAuthenticated, creators.length]);

  const fetchCreators = async () => {
    try {
      const usersRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/all`
      );

      const artworksRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/art`
      );

      const users = usersRes.data.users || usersRes.data;
      const artworks = artworksRes.data;

      const creatorsMap = new Map();

      users.forEach((user) => {
        const userArtworks = artworks.filter(
          (art) => art.auth0Id === user.auth0Id
        );

        if (userArtworks.length > 0) {
          const hasArtwork = userArtworks.some(
            (art) => art.type && art.type.toLowerCase() !== "invention"
          );
          const hasInvention = userArtworks.some(
            (art) => art.type && art.type.toLowerCase() === "invention"
          );

          let creatorType = "artist";
          if (hasInvention && hasArtwork) {
            creatorType = "both";
          } else if (hasInvention) {
            creatorType = "inventor";
          }

          creatorsMap.set(user.auth0Id, {
            ...user,
            artworks: userArtworks,
            creatorType,
            totalWorks: userArtworks.length,
            followerCount: user.followers ? user.followers.length : 0,
            followingCount: user.following ? user.following.length : 0,
          });
        }
      });

      setCreators(Array.from(creatorsMap.values()));
    } catch (err) {
      console.error("Error fetching creators:", err);
      setError("Failed to load artists and inventors");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllFollowStatus = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const statusPromises = creators.map(async (creator) => {
        if (creator.auth0Id === user?.sub) return null;
        
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/follow/status/${creator.auth0Id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          return { [creator.auth0Id]: res.data.isFollowing };
        } catch (err) {
          return { [creator.auth0Id]: false };
        }
      });

      const results = await Promise.all(statusPromises);
      const statusMap = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setFollowStatus(statusMap);
    } catch (err) {
      console.error("Error fetching follow status:", err);
    }
  };

  const handleFollow = async (creatorAuth0Id) => {
    if (!isAuthenticated) {
      alert("Please login to follow creators");
      return;
    }

    setFollowLoading({ ...followLoading, [creatorAuth0Id]: true });

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/follow`,
        { targetUserId: creatorAuth0Id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update follow status
      setFollowStatus({
        ...followStatus,
        [creatorAuth0Id]: res.data.isFollowing,
      });

      // Update follower count in creators list
      setCreators(
        creators.map((creator) =>
          creator.auth0Id === creatorAuth0Id
            ? { ...creator, followerCount: res.data.followerCount }
            : creator
        )
      );
    } catch (err) {
      console.error("Error following user:", err);
      alert("Failed to update follow status");
    } finally {
      setFollowLoading({ ...followLoading, [creatorAuth0Id]: false });
    }
  };

  const toggleWorks = (creatorAuth0Id) => {
    setExpandedCreator(
      expandedCreator === creatorAuth0Id ? null : creatorAuth0Id
    );
  };

  const handleContactCreator = (creatorAuth0Id) => {
    if (!isAuthenticated) {
      // Save intended action and redirect to login
      sessionStorage.setItem("returnTo", `/messages?userId=${creatorAuth0Id}`);
      loginWithRedirect();
      return;
    }

    // Navigate to messages with pre-filled recipient
    navigate(`/messages?userId=${creatorAuth0Id}`);
  };

  const filteredCreators = creators.filter((creator) => {
    if (filter === "all") return true;
    if (filter === "artists")
      return creator.creatorType === "artist" || creator.creatorType === "both";
    if (filter === "inventors")
      return creator.creatorType === "inventor" || creator.creatorType === "both";
    return true;
  });

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-700 text-xl font-medium">
              Loading creators...please wait.
            </p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="mt-24 px-4 max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 text-lg"> {error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mt-24 px-4 sm:px-6 lg:px-12 mb-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Artists & Inventors
          </h1>
          <p className="text-gray-600 text-lg">
            Discover talented creators and their amazing works
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All ({creators.length})
          </button>
          <button
            onClick={() => setFilter("artists")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              filter === "artists"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            🎨 Artists (
            {
              creators.filter(
                (c) => c.creatorType === "artist" || c.creatorType === "both"
              ).length
            }
            )
          </button>
          <button
            onClick={() => setFilter("inventors")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              filter === "inventors"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            🔧 Inventors (
            {
              creators.filter(
                (c) => c.creatorType === "inventor" || c.creatorType === "both"
              ).length
            }
            )
          </button>
        </div>

        {/* Creators Grid */}
        {filteredCreators.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No creators found</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {filteredCreators.map((creator) => (
              <div
                key={creator.auth0Id}
                className="bg-white rounded-lg shadow-md mb-8 overflow-hidden hover:shadow-xl transition"
              >
                {/* Creator Header */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {creator.avatar ? (
                        <img
                          src={creator.avatar}
                          alt={creator.username || "Creator"}
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                          {creator.username
                            ? creator.username[0].toUpperCase()
                            : "?"}
                        </div>
                      )}
                    </div>

                    {/* Creator Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                          {creator.fullname || creator.username || "Anonymous"}
                        </h2>
                        <div className="flex gap-2 justify-center sm:justify-start flex-wrap">
                          {(creator.creatorType === "artist" ||
                            creator.creatorType === "both") && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                              🎨 Artist
                            </span>
                          )}
                          {(creator.creatorType === "inventor" ||
                            creator.creatorType === "both") && (
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                              🔧 Inventor
                            </span>
                          )}
                        </div>
                      </div>

                      {creator.username && creator.fullname && (
                        <p className="text-gray-600 mb-2">@{creator.username}</p>
                      )}

                      {creator.bio && (
                        <p className="text-gray-700 italic mb-3 max-w-2xl">
                          "{creator.bio}"
                        </p>
                      )}

                      {/* Stats */}
                      <div className="flex gap-6 justify-center sm:justify-start text-sm text-gray-600 mb-4">
                        <div>
                          <span className="font-semibold text-gray-800">
                            {creator.totalWorks}
                          </span>{" "}
                          {creator.totalWorks === 1 ? "Work" : "Works"}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">
                            {creator.followerCount || 0}
                          </span>{" "}
                          {creator.followerCount === 1 ? "Follower" : "Followers"}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">
                            {creator.followingCount || 0}
                          </span>{" "}
                          Following
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 justify-center sm:justify-start flex-wrap">
                        <button
                          onClick={() => toggleWorks(creator.auth0Id)}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                          {expandedCreator === creator.auth0Id
                            ? "Hide Works"
                            : `View Works (${creator.totalWorks})`}
                        </button>

                        {/* Contact Creator Button */}
                        {user?.sub !== creator.auth0Id && (
                          <button
                            onClick={() => handleContactCreator(creator.auth0Id)}
                            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
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
                            Contact
                          </button>
                        )}

                        {/* Follow Button - Hide if it's current user */}
                        {isAuthenticated && user?.sub !== creator.auth0Id && (
                          <button
                            onClick={() => handleFollow(creator.auth0Id)}
                            disabled={followLoading[creator.auth0Id]}
                            className={`px-6 py-2 rounded-lg font-medium transition ${
                              followStatus[creator.auth0Id]
                                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                : "bg-purple-600 text-white hover:bg-purple-700"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {followLoading[creator.auth0Id]
                              ? "..."
                              : followStatus[creator.auth0Id]
                              ? "Following"
                              : "Follow"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creator's Works - Only show when expanded */}
                {expandedCreator === creator.auth0Id && (
                  <div className="p-6 bg-gray-50">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Works by {creator.username || "this creator"}
                    </h3>

                    {creator.artworks.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {creator.artworks.map((artwork) => (
                          <Link
                            key={artwork._id}
                            to={
                              artwork.type?.toLowerCase() === "invention"
                                ? `/inventioncard/${artwork._id}`
                                : `/artworks/${artwork._id}`
                            }
                            className="group bg-white rounded-lg overflow-hidden hover:shadow-md transition"
                          >
                            <div className="aspect-square overflow-hidden">
                              <img
                                src={artwork.image}
                                alt={artwork.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="font-semibold text-gray-800 mb-1 truncate">
                                {artwork.name}
                              </h4>
                              <div className="text-xs text-gray-600 space-y-1">
                                {artwork.size && (
                                  <p className="truncate">Size: {artwork.size}</p>
                                )}
                                {artwork.type && (
                                  <p className="truncate">Type: {artwork.type}</p>
                                )}
                                {artwork.price && (
                                  <p className="font-semibold text-blue-600">
                                    {artwork.price}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No works available
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Artistinventor;
