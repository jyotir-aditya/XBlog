"use client";
import { CloudIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const EditProfileForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputProfilePictureFile = useRef(null);
  const inputCoverPictureFile = useRef(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [profileFileName, setProfileFileName] = useState(null);
  const [coverFileName, setCoverFileName] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/query/profile`);
        const profile = await response.json();
        setProfile(profile);
        setUserData(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  function validateImageType(file) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    return allowedTypes.includes(file.type);
  }

  async function handleSumbit(event) {
    event.preventDefault();
    setIsUpdating(true);

    let newProfileBlob, newCoverBlob;
    const maxSizeInBytes = 1048576; // 1MB

    const profileFile = inputProfilePictureFile.current.files[0];
    if (profileFile && !validateImageType(profileFile)) {
      alert("Invalid file type. Please upload an image.");
      inputProfilePictureFile.current.value = null;
      setProfileImageUrl(null);
      setProfileFileName(null);
      setIsUpdating(false);
      return;
    }
    if (profileFile && profileFile.size > maxSizeInBytes) {
      alert('File too large. Maximum allowed size is 1MB.');
      inputProfilePictureFile.current.value = null;
      setProfileImageUrl(null);
      setProfileFileName(null);
      setIsUpdating(false);
      return;
    }

    const coverFile = inputCoverPictureFile.current.files[0];
    if (coverFile && !validateImageType(coverFile)) {
      alert("Invalid file type. Please upload an image.");
      inputCoverPictureFile.current.value = null;
      setCoverFileName(null);
      setIsUpdating(false);
      return;
    }
    if (coverFile && coverFile.size > maxSizeInBytes) {
      alert('File too large. Maximum allowed size is 1MB.');
      inputCoverPictureFile.current.value = null;
      setCoverFileName(null);
      setIsUpdating(false);
      return;
    }

    if (profileFile) {
      const response = await fetch(`/api/upload/profile/image?filename=${profileFile.name}`, {
        method: "POST",
        body: profileFile,
      });
      newProfileBlob = await response.json();
    }

    if (coverFile) {
      const response = await fetch(`/api/upload/profile/cover?filename=${coverFile.name}`, {
        method: "POST",
        body: coverFile,
      });
      newCoverBlob = await response.json();
    }

    const formData = new FormData(event.target);
    if (newProfileBlob) {
      formData.append("image", newProfileBlob.url);
    }
    if (newCoverBlob) {
      formData.append("coverimageurl", newCoverBlob.url);
    }

    try {
      const response = await fetch("/api/query/profile", {
        method: "PUT",
        body: formData,
      });
      if (response.status === 200) {
        setIsSuccess(true);
        setTimeout(() => {
          router.back();
        }, 1500);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setIsUpdating(false);
    }
  }

  const handleProfileClick = () => {
    inputProfilePictureFile.current.click();
  };

  function loadProfilePic() {
    const file = inputProfilePictureFile.current.files[0];
    setProfileImageUrl(URL.createObjectURL(file));
    setProfileFileName(file.name);
  }

  const handleProfileRemove = () => {
    inputProfilePictureFile.current.value = null;
    setProfileImageUrl(null);
    setProfileFileName(null);
  };

  const handleCoverClick = () => {
    inputCoverPictureFile.current.click();
  };

  function loadCoverPic() {
    const file = inputCoverPictureFile.current.files[0];
    setCoverFileName(file.name);
  }

  const handleCoverRemove = () => {
    inputCoverPictureFile.current.value = null;
    setCoverFileName(null);
  };

  return (
    <div>
      <div className="w-full min-h-[70vh] max-h-fit p-4 bg-white">
        {profile && (
          <form onSubmit={handleSumbit}>
            <div className="flex flex-col gap-1 sm:gap-2">
              <div className="flex gap-4">
                {profileImageUrl === null && (
                  <Image
                    src={profile.image}
                    height={90}
                    width={90}
                    alt="image"
                    className="rounded-full"
                  />
                )}
                {profileImageUrl && (
                  <Image
                    src={profileImageUrl}
                    height={90}
                    width={90}
                    alt="image"
                    className="rounded-full"
                  />
                )}
                <div className="w-full">
                  <label className="mb-2">Profile Picture</label>
                  <div className="ProfilePic w-full flex items-center">
                    {profileFileName === null ? (
                      <button
                        type="button"
                        onClick={handleProfileClick}
                        className="flex items-center w-full sm:text-[1.3vw] px-4 py-2 bg-white border-2 border-gray-200 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-opacity-50"
                      >
                        <CloudIcon className="w-5 h-5 mr-2 sm:w-[1.5rem] sm:h-[1.5rem]" />
                        Profile Picture
                      </button>
                    ) : (
                      <div className="flex items-center border-2 border-gray-300 rounded-md justify-between sm:text-[1.3vw] px-4 py-2 w-full text-black">
                        <div className="flex items-center">
                          <PhotoIcon className="w-5 h-5 sm:w-[1.5rem] sm:h-[1.5rem] mr-2" />
                          {profileFileName}
                        </div>
                        <button
                          type="button"
                          onClick={handleProfileRemove}
                          className="flex items-center justify-center px-2 py-2 z-10 text-black rounded-md hover:text-red-600 focus:outline-none"
                        >
                          <TrashIcon className="w-5 h-5 sm:w-[1.5rem] sm:h-[1.5rem]" />
                        </button>
                      </div>
                    )}
                    <input
                      className="hidden"
                      name="file"
                      ref={inputProfilePictureFile}
                      type="file"
                      accept="image/*"
                      onChange={loadProfilePic}
                    />
                  </div>
                </div>
              </div>

              <label>Name</label>
              <input
                className="sm:text-[1.3vw] rounded-md px-4 py-2 border-2"
                autoComplete="off"
                autoCorrect="off"
                placeholder="Name"
                type="text"
                name="name"
                defaultValue={profile.name}
                required
              />
              <label>Email</label>
              <input
                className="sm:text-[1.3vw] rounded-md px-4 py-2 border-2"
                autoComplete="off"
                autoCorrect="off"
                placeholder="Email"
                type="text"
                name="email"
                defaultValue={profile.email}
                disabled={true}
                required
              />
              <label>Username</label>
              <input
                className="sm:text-[1.3vw] rounded-md px-4 py-2 border-2"
                autoComplete="off"
                autoCorrect="off"
                placeholder="Username"
                type="text"
                name="username"
                disabled={true}
                defaultValue={profile.username}
                required
              />

              <div className="w-full">
                <label>Cover Image</label>
                <div className="CoverPic w-full flex items-center">
                  {coverFileName === null ? (
                    <button
                      type="button"
                      onClick={handleCoverClick}
                      className="flex items-center w-full sm:text-[1.3vw] px-4 py-2 bg-white border-2 border-gray-200 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-opacity-50"
                    >
                      <CloudIcon className="w-5 h-5 mr-2 sm:w-[1.5rem] sm:h-[1.5rem]" />
                      Cover Picture
                    </button>
                  ) : (
                    <div className="flex items-center border-2 border-gray-300 rounded-md justify-between sm:text-[1.3vw] px-4 py-2 w-full text-black">
                      <div className="flex items-center">
                        <PhotoIcon className="w-5 h-5 sm:w-[1.5rem] sm:h-[1.5rem] mr-2" />
                        {coverFileName}
                      </div>
                      <button
                        type="button"
                        onClick={handleCoverRemove}
                        className="flex items-center justify-center px-2 py-2 z-10 text-black rounded-md hover:text-red-600 focus:outline-none"
                      >
                        <TrashIcon className="w-5 h-5 sm:w-[1.5rem] sm:h-[1.5rem]" />
                      </button>
                    </div>
                  )}
                  <input
                    className="hidden"
                    name="coverimgfile"
                    ref={inputCoverPictureFile}
                    type="file"
                    accept="image/*"
                    onChange={loadCoverPic}
                  />
                </div>
              </div>

              <label>Bio</label>
              <textarea
                className="sm:text-[1.3vw] rounded-md px-4 py-2 outline-none border-2"
                rows={3}
                placeholder="Bio (30-40 words)"
                name="bio"
                defaultValue={profile.bio}
                required
              />
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="px-4 rounded-full py-1 border-2 w-fit"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Submitting..." : "Submit"}
                </button>
              </div>
              {isSuccess && (
                <div className="w-full flex justify-center">
                  <div className="text-green-500">Updated profile successfully</div>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfileForm;
