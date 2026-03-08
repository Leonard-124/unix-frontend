import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Navbar from "../../Pages/Navbar";
import { Link } from "react-router-dom";
import EmailVerificationBanner from "../../Divolved/Emails/EmailVerificationBanner"

const UserProfile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState("");
  const [savingBio, setSavingBio] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [savingUsername, setSavingUsername] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const syncAndFetchProfile = async () => {
      try {
        const token = await getAccessTokenSilently();

        // 1. Sync user with backend
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/users`,
          {
            auth0Id: user.sub,
            email: user.email,
            username: user.nickname,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // 2. Fetch profile after sync
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/users/${user.sub}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setProfile(res.data);
        setBio(res.data.bio || "");
        setUsername(res.data.username || user.nickname || "");
        
        // Set share URL if username exists
        if (res.data.username) {
          setShareUrl(`${window.location.origin}/creator/${res.data.username}`);
        }
      } catch (err) {
        console.error("❌ Error syncing/fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) syncAndFetchProfile();
  }, [isAuthenticated, getAccessTokenSilently, user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (1MB = 1024 * 1024 bytes)
    if (file.size > 1024 * 1024) {
      setError("Avatar must be less than 1MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    setError("");
    setAvatarPreview(URL.createObjectURL(file));
    uploadAvatar(file);
  };

  const uploadAvatar = async (file) => {
    setUploadingAvatar(true);
    setError("");

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("auth0Id", user.sub);

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      console.log("Uploading avatar with auth0Id:", user.sub);
      console.log("Token (first 20 chars):", token.substring(0, 20) + "...");

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(res.data.user);
      setAvatarPreview(null);
      alert("Avatar updated successfully! ✅");
    } catch (err) {
      console.error("❌ Error uploading avatar:", err);
      console.error("Error response:", err.response?.data);
      setError(err.response?.data?.message || "Failed to upload avatar");
      setAvatarPreview(null);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const saveBio = async () => {
    setSavingBio(true);
    setError("");

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/bio`,
        { bio, auth0Id: user.sub },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfile(res.data.user);
      setEditingBio(false);
      alert("Bio updated successfully! ✅");
    } catch (err) {
      console.error("❌ Error updating bio:", err);
      setError(err.response?.data?.message || "Failed to update bio");
    } finally {
      setSavingBio(false);
    }
  };

  const saveUsername = async () => {
    setSavingUsername(true);
    setError("");

    // Validate username
    if (!username || username.trim().length < 3) {
      setError("Username must be at least 3 characters");
      setSavingUsername(false);
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username can only contain letters, numbers, and underscores");
      setSavingUsername(false);
      return;
    }

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/username`,
        { username: username.trim(), auth0Id: user.sub },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfile(res.data.user);
      setEditingUsername(false);
      setShareUrl(`${window.location.origin}/creator/${res.data.user.username}`);
      alert("Username updated successfully! ✅");
    } catch (err) {
      console.error("❌ Error updating username:", err);
      setError(err.response?.data?.message || "Failed to update username");
    } finally {
      setSavingUsername(false);
    }
  };

  const copyShareLink = () => {
    if (!shareUrl) {
      alert("Please set a username first to get your shareable link");
      return;
    }
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isAuthenticated) {
    return <p className="text-center mt-10 text-lg">Please log in</p>;
  }

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading profile...</p>;
  }

  const displayAvatar = avatarPreview || profile?.avatar || user.picture;

  return (
    <>
      <Navbar />

      <div className="mt-24 px-4 sm:px-6 lg:px-8">
        {/* Email Verification Banner */}
        {!user.email_verified && (
          <div className="max-w-2xl mx-auto mb-6">
            <EmailVerificationBanner />
          </div>
        )}

        {/* Profile Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Welcome to UnixArt
          </h2>

          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={displayAvatar}
                alt={profile?.username || user.nickname}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 mb-4"
              />
              
              {uploadingAvatar && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
            </div>

            <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              {uploadingAvatar ? "Uploading..." : "Change Avatar"}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                disabled={uploadingAvatar}
              />
            </label>
            
            <p className="text-xs text-gray-500 mt-2">Max size: 1MB</p>
            
            {error && (
              <p className="text-red-500 text-sm mt-2">❌ {error}</p>
            )}
          </div>

          <div className="space-y-3 text-gray-700">
            {/* Username Section */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">Username:</span>
                {!editingUsername && (
                  <button
                    onClick={() => setEditingUsername(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Edit
                  </button>
                )}
              </div>

              {editingUsername ? (
                <div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Min 3 characters. Letters, numbers, and underscores only.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        setUsername(profile?.username || user.nickname || "");
                        setEditingUsername(false);
                        setError("");
                      }}
                      className="px-3 py-1 text-gray-600 border rounded hover:bg-gray-50"
                      disabled={savingUsername}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveUsername}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      disabled={savingUsername}
                    >
                      {savingUsername ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-800">
                  {profile?.username || user.nickname || "Not set"}
                </p>
              )}
            </div>

            {/* Email */}
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {profile?.email || user.email}
            </p>

            {/* Bio Section */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Bio:</span>
                {!editingBio && (
                  <button
                    onClick={() => setEditingBio(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    {profile?.bio ? "Edit" : "Add Bio"}
                  </button>
                )}
              </div>

              {editingBio ? (
                <div>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength={500}
                    placeholder="Tell us about yourself, your art style, or your inventions..."
                    className="w-full border rounded px-3 py-2 h-28 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {bio.length}/500 characters
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setBio(profile?.bio || "");
                          setEditingBio(false);
                        }}
                        className="px-3 py-1 text-gray-600 border rounded hover:bg-gray-50"
                        disabled={savingBio}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveBio}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={savingBio}
                      >
                        {savingBio ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 italic">
                  {profile?.bio || "No bio added yet"}
                </p>
              )}
            </div>
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

          <Link
            to="/post"
            className="bg-red-400 text-white px-5 py-2 rounded shadow hover:bg-red-500 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Share Profile Section */}
        {profile?.username && shareUrl && (
          <div className="max-w-2xl mx-auto mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              🔗 Share Your Profile
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Share this link with clients to showcase your artworks and inventions
            </p>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border rounded bg-gray-50 text-sm font-mono"
                  onClick={(e) => e.target.select()}
                />
                <button
                  onClick={copyShareLink}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link
                to={`/creator/${profile.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline text-sm"
              >
                Preview your public profile →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
