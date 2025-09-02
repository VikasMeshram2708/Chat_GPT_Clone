"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Calendar,
  Edit3,
  Save,
  X,
  Shield,
  Crown,
  Zap,
} from "lucide-react";
import { getUserProfile, updateUserProfile } from "@/(dal)/user-act";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  isSubscriber: boolean;
  isProUser: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  stats: {
    totalChats: number;
    totalTokens: number;
    favoriteFeatures: string[];
  };
  apiUsage: {
    current: number;
    limit: number;
  };
  preferences: {
    theme: string;
    language: string;
    notifications: boolean;
  };
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const result = await getUserProfile();

      if (result.success && result.data) {
        // Cast the data to UserProfile type
        setUserProfile(result.data as unknown as UserProfile);
      } else {
        setError(result.error || "Failed to fetch profile");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error fetching profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!userProfile) return;

    try {
      const formData = new FormData();
      formData.append("name", userProfile.name);
      if (userProfile.image) {
        formData.append("image", userProfile.image);
      }

      const result = await updateUserProfile(formData);

      if (result.success) {
        setIsEditing(false);
        await fetchUserProfile();
      } else {
        setError(result.error || "Failed to update profile");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error updating profile:", err);
    }
  };

  const getPlanBadge = () => {
    if (!userProfile) return null;

    let plan = "free";
    if (userProfile.isProUser) plan = "pro";
    else if (userProfile.isSubscriber) plan = "premium";

    const planStyles = {
      free: "bg-gray-100 text-gray-800 border-gray-300",
      premium: "bg-blue-100 text-blue-800 border-blue-300",
      pro: "bg-purple-100 text-purple-800 border-purple-300",
    };

    const planIcons = {
      free: Shield,
      premium: Zap,
      pro: Crown,
    };

    const Icon = planIcons[plan as keyof typeof planIcons];

    return (
      <Badge
        className={`${planStyles[plan as keyof typeof planStyles]} font-medium`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {plan.charAt(0).toUpperCase() + plan.slice(1)}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={fetchUserProfile}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">No profile data found</p>
          <Button onClick={fetchUserProfile}>Load Profile</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Card */}
          <div className="lg:w-1/3">
            <Card className="sticky top-8">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-primary/10">
                    <AvatarImage
                      src={userProfile.image || ""}
                      alt={userProfile.name}
                    />
                    <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                      {userProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {getPlanBadge()}
                </div>

                <CardTitle className="text-2xl font-bold">
                  {userProfile.name}
                </CardTitle>
                <p className="text-muted-foreground">{userProfile.email}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="truncate">{userProfile.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      Joined{" "}
                      {new Date(userProfile.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      Last login{" "}
                      {new Date(userProfile.lastLogin).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <Separator />

                <Button
                  variant={isEditing ? "outline" : "default"}
                  className="w-full"
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>

                {isEditing && (
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setIsEditing(false)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3 space-y-6">
            {/* Usage Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  API Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current Usage</span>
                    <span className="text-sm text-muted-foreground">
                      {userProfile.apiUsage.current.toLocaleString()} /{" "}
                      {userProfile.apiUsage.limit.toLocaleString()} requests
                    </span>
                  </div>
                  <div className="w-full bg-secondary/20 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(userProfile.apiUsage.current / userProfile.apiUsage.limit) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Resets monthly on the 1st
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Activity Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {userProfile.stats.totalChats}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Chats
                    </div>
                  </div>
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {userProfile.stats.totalTokens.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tokens Used
                    </div>
                  </div>
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {userProfile.stats.favoriteFeatures.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Features Used
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Favorite Features */}
            <Card>
              <CardHeader>
                <CardTitle>Most Used Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userProfile.stats.favoriteFeatures.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account Settings Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Theme</span>
                    <Badge variant="outline">
                      {userProfile.preferences.theme.charAt(0).toUpperCase() +
                        userProfile.preferences.theme.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Language</span>
                    <Badge variant="outline">
                      {userProfile.preferences.language}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Notifications</span>
                    <Badge
                      variant={
                        userProfile.preferences.notifications
                          ? "default"
                          : "secondary"
                      }
                    >
                      {userProfile.preferences.notifications
                        ? "Enabled"
                        : "Disabled"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Plan</span>
                    {getPlanBadge()}
                  </div>
                </div>

                <Separator />

                <Button variant="outline" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Manage Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
