"use client";

import { useEffect } from "react";
import accountApiRequest from "@/apiRequest/account";
import { clientSessionToken } from "@/lib/http";

const Profile = () => {
  useEffect(() => {
    console.log("🚀clientSessionToken---->", clientSessionToken.value);
    const fetchProfile = async () => {
      try {
        const profile = await accountApiRequest.meClient();
        if (profile.status === 200) {
          console.log("🚀profile---->", profile);
        }
      } catch (error) {
        console.log("🚀error---->", error);
      }
    };

    fetchProfile();
  }, []);

  return <div>Profile</div>;
};

export default Profile;
