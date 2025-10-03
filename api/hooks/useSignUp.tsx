import { UserRole } from "@/types/signUp";
import axios from "../axios";

export const useSignUp = () => {
  const signUp = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/v1/user/sign/up", {
        email,
        password,
        user_role: UserRole.User,
      });
      return response.data;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };
  return signUp;
};

