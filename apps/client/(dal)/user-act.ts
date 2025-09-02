/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth-options";
import prisma from "@/app/utils/prisma-instance";

export async function getUserProfile() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { error: "Unauthorized", status: 401 };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        chat: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
    });

    if (!user) {
      return { error: "User not found", status: 404 };
    }

    // Calculate stats based on your schema
    const totalChats = await prisma.chat.count({
      where: {
        userId: session.user.id,
      },
    });

    // For tokens, you'll need to add this field to your Chat model if you want to track it
    // For now, we'll use a placeholder
    const totalTokens = totalChats * 365; // Placeholder calculation

    return {
      success: true,
      data: {
        ...user,
        stats: {
          totalChats,
          totalTokens,
          favoriteFeatures: [
            "Code Generation",
            "Writing Assistant",
            "Data Analysis",
          ],
        },
        apiUsage: {
          current: Math.min(totalChats, 5000),
          limit: 5000,
        },
        preferences: {
          theme: "dark",
          language: "English",
          notifications: true,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { error: "Internal server error", status: 500 };
  }
}

export async function updateUserProfile(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { error: "Unauthorized", status: 401 };
    }

    // const name = formData.get("name") as string;
    // const image = formData.get("image") as string;

    const allowedFields = ["name", "image"];
    const updateData: Record<string, any> = {};

    for (const field of allowedFields) {
      const value = formData.get(field);
      if (value !== null && value !== undefined && value !== "") {
        updateData[field] = value;
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { error: "Internal server error", status: 500 };
  }
}
