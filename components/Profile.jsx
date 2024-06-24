"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
    useEffect(() => {
      const fetchProfile = async () => {
        setIsLoading(true); // Set loading state to true
        setError(null); // Clear any previous errors
        try {
          const response = await fetch(`/api/query/profile`);
          const profile = await response.json();
          setData(profile);
        } catch (error) {
          console.error("Error fetching profile:", error);
          setError(error); // Set error state for handling
        } finally {
          setIsLoading(false); // Set loading state to false regardless of success/failure
        }
      };
      if(status==="authenticated"){
        fetchProfile();
      }
      
    }, [status]);
  

  if (status === "unauthenticated") {
    return <div>Please Sign in...</div>;
  }

  if (status === "authenticated") {
    return (
      <div className="mt-[15vh]">
        {isLoading && <p>Loading profile...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <>
          <h1>Data is</h1>
            <h1>{data.name}</h1>
            <p>Email: {data.email}</p>
            <p>Username: {data.username}</p>
            <p>{data.bio}</p>
            {/* Add more info based on your data structure */}
          </>
        )}
      </div>
    );
  }
};

export default Profile;

 
