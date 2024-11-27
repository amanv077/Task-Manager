import React, { useState, useEffect } from "react";
import { fetchUserProfile, updateUserProfile } from "../services/api";

const UserProfilePage = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const profile = await fetchUserProfile();
      setUser(profile);
      setUpdatedUser(profile);
    };
    getUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedProfile = await updateUserProfile(updatedUser);
      setUser(updatedProfile);
      setEditing(false);
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">My Profile</h1>
      {editing ? (
        <>
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, name: e.target.value })
            }
            className="border p-2 mb-4 w-full"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
            className="border p-2 mb-4 w-full"
            placeholder="Email"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 w-full"
          >
            Save Changes
          </button>
        </>
      ) : (
        <>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 w-full"
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
