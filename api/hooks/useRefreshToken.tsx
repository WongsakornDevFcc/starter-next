import { useSession } from "next-auth/react";
import axios from "../axios";

export const useRefreshToken = () => {
  const { data: session } = useSession();
  const refreshToken = async () => {
    const res = await axios.post("/api/v1/authentication/refresh", {
      refresh: session?.tokens.refresh,
    });
    if (session?.tokens.access) session.tokens.access = res.data.tokens.access;
  };
  return refreshToken;
};
