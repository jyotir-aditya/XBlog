"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditProfileForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const [isUpadating, setIsUpdating] = useState(false);
  const [isSuccess, setisSuccess] = useState();
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors
      try {
        const response = await fetch(`/api/query/profile`);
        const profile = await response.json();
        setProfile(profile);
        setUserData(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error); // Set error state for handling
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success/failure
      }
    };
    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  if (profile) {
    console.log("profile fetched");
    console.log("user data:", userData);
  }
  async function handleSumbit() {
    event.preventDefault();
    setIsUpdating(true);
    const formData = new FormData(event.target);
    try {
      const response = await fetch("/api/query/profile", {
        method: "PUT",
        body: formData,
      });
      const res = await response.status;
      console.log(res);
      if (res === 200) {
        setisSuccess(true);
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
  return (
    <div>
      <div className="w-full min-h-[70vh] max-h-fit p-4 bg-white">
        {profile && (
          <form onSubmit={handleSumbit}>
            <div className="flex flex-col gap-1 sm:gap-2">
              <div className="flex gap-4">
                <Image
                  src={profile.image}
                  height={90}
                  width={90}
                  alt="image"
                  className="rounded-full"
                />
                <div className="w-full">
                  <label className="mb-2">Profile Picture</label>
                  <div className="ProfilePic w-full flex items-center">
                    <input
                      className="sm:text-[1.3vw] text-base rounded-md px-4 py-2 border-2 w-full"
                      autoComplete="off"
                      autoCorrect="off"
                      placeholder="Profile image"
                      type="text"
                      name="image"
                      defaultValue={profile.image}
                      required
                    ></input>
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
                placeholder="Name"
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
              <label>Cover Image</label>
              <input
                className="sm:text-[1.3vw] rounded-md px-4 py-2 border-2"
                autoComplete="off"
                autoCorrect="off"
                placeholder="Cover image"
                type="text"
                name="coverimage"
                defaultValue={profile.coverimageurl}
              />
              <label>bio</label>
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
                  type="sumbit"
                  className="px-4 rounded-full py-1 border-2 w-fit"
                  disabled={isUpadating}
                >
                  {isUpadating ? "Sumbiting.." : "Sumbit"}
                </button>
              </div>
              {isSuccess && (
                <div className="w-full flex justify-center">
                  <div className="text-green-500 ">
                    Updated profile successfully
                  </div>
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
