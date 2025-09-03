import { AuthOptions, DefaultSession, DefaultUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma-instance";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !AUTH_SECRET) {
  throw new Error("Missing Auth Env Variables...");
}

export const authOptions: AuthOptions = {
  secret: AUTH_SECRET,
  pages: {
    signIn: "/a/signin",
  },
  session: {
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const userEmail = user.email;

        if (!userEmail) {
          console.error("No email provided by Google");
          return false;
        }

        // Use upsert to handle both create and update in one operation
        await prisma.user.upsert({
          where: {
            email: userEmail,
          },
          update: {
            lastLogin: new Date(),
            name: user.name || undefined,
            image: user.image || undefined,
          },
          create: {
            name: user.name as string,
            email: user.email as string,
            image: user.image as string,
            lastLogin: new Date(),
          },
        });

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      // Initial sign in - user object is available
      if (user) {
        token.id = user.id;
      }

      // Fetch user data from database on subsequent calls
      if (token.email && !token.id) {
        try {
          const userData = await prisma.user.findUnique({
            where: {
              email: token.email,
            },
          });

          if (userData) {
            token.id = userData.id;
            token.name = userData.name;
            token.picture = userData.image || null;
          }
        } catch (error) {
          console.error("Error fetching user in jwt callback:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // Ensure other properties are properly typed
        if (token.name) session.user.name = token.name as string;
        if (token.email) session.user.email = token.email as string;
        if (token.picture) session.user.image = token.picture as string;
      }
      return session;
    },
  },
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
