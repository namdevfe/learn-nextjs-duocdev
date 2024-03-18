import accountApiRequest from "@/apiRequest/account";
import Profile from "@/app/me/profile";
import { cookies } from "next/headers";

const ProfilePage = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  return (
    <div>
      <h1>Profile</h1>
      <div>{result.payload?.data?.name}</div>
      <Profile />
    </div>
  );
};

export default ProfilePage;
