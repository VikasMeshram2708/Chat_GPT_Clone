"use server";
import { signIn } from "next-auth/react";

export async function signInWithGoogle() {
  try {
    await signIn("google");
    return {
      success: true,
      message: "Logged In",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Internal server error",
    };
  }
}
