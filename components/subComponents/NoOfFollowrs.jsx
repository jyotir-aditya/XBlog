import React, { useEffect, useState } from 'react';

async function getFollowers(id) {
  console.log("inside fetch posts");
  try {
    const response = await fetch(`/api/query/nooffollowers?userId=${id}`);
    const res = await response.json();
    console.log("inside getFollowers:", res);
    return res;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

const NoOfFollowers = ({ id }) => {
  const [followersCount, setFollowersCount] = useState(null);

  useEffect(() => {
    async function fetchFollowers() {
      const data = await getFollowers(id);
      setFollowersCount(data);
    }

    fetchFollowers();
  }, [id]);

  if (followersCount === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className='text-[13px] font-robo text-gray-500'>{followersCount} Followers</div>
  );
}

export default NoOfFollowers;
