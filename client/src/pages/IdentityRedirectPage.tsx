import { Navigate, useParams } from "react-router-dom";
import { profileData } from "../data/profile";

export function IdentityRedirectPage() {
  const { username } = useParams<{ username: string }>();
  const targetUser = username || profileData.username;

  if (targetUser !== profileData.username) {
    return <Navigate to={`/profile/${profileData.username}`} replace />;
  }

  return <Navigate to={`/profile/${targetUser}/about#identity`} replace />;
}
