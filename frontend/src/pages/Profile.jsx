import axios from "axios";
import toast from "react-hot-toast";
import { useState, useRef } from "react";

const Profile = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const fileInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [preview, setPreview] = useState(
    user?.profileImage || ""
  );

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handlePhotoChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setSelectedImage(file);

  setPreview(URL.createObjectURL(file));
};
const handleSaveChanges = async () => {
  try {
    const token = localStorage.getItem("token");

    let profileImage = user?.profileImage;

    // Upload new image if selected
    if (selectedImage) {
      const formData = new FormData();
      formData.append("profileImage", selectedImage);

      const uploadRes = await axios.post(
        "http://localhost:5000/api/users/upload-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      profileImage = uploadRes.data.profileImage;
    }

    // Update name & phone
    const res = await axios.put(
      "http://localhost:5000/api/users/profile",
      {
        name,
        phone,
        profileImage,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update localStorage
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    toast.success("Profile updated successfully!");

  } catch (error) {
    console.log(error);
    toast.error("Failed to update profile");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#1f1408] to-[#020617] flex justify-center items-start pt-28 px-5">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <h1 className="text-3xl font-bold text-white">
            My Profile
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your personal information.
          </p>
        </div>
        {/* Body */}
        <div className="p-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-10">
            <img
                  src={
                    preview ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                                 alt="profile"
                  className="w-36 h-36 rounded-full object-cover border-4 border-yellow-400 shadow-xl"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  hidden
                  onChange={handlePhotoChange}
                />
            <button
                 onClick={() => fileInputRef.current.click()}
                  className="mt-5 bg-yellow-500 hover:bg-yellow-400 text-black px-6                 py-2 rounded-full font-semibold transition"
                >
                  Change Photo
            </button>     
          </div>
          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="text-gray-300 block mb-2">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="text-gray-300 block mb-2">
                Email
              </label>
              <input
                value={user?.email}
                disabled
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-gray-300 block mb-2">
                Phone
              </label>
              <input
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-yellow-400"
              />
            </div>
          </div>
          {/* Save Button */}
          <div className="mt-10 flex justify-end">
            <button
              onClick={handleSaveChanges}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;