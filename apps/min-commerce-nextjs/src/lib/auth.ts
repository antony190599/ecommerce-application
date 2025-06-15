/* eslint-disable @typescript-eslint/no-unused-vars */
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/database/db";
import { users, customers } from "@/database/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';
import { JWT } from "next-auth/jwt";
import { Account, Profile, User, type NextAuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import NextAuth, { SessionStrategy } from "next-auth";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";

interface JWTParams {
    token: JWT;
    user?: User | AdapterUser;
    account?: Account;
    profile?: Profile;
    trigger?: "signIn" | "signUp" | "update";
    isNewUser?: boolean;
    session?: Session;
}

interface SignInParams {
    user: User | AdapterUser;
    account?: Account;
    profile?: Profile;
    isNewUser?: boolean;
}


export const authOptions = {
  // 1. Proveedor Google
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  // 2. Configuración de sesión mediante JWT
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },

  // 3. Secreto para firmar y cifrar JWT
  secret: process.env.NEXTAUTH_SECRET,

  // 4. Callbacks para enriquecer token y sesión
  callbacks: {
    signIn: async ({ user, account, profile }) => {
        if (account?.provider === "google") {
            // Check if the user has a valid email
            if (!user.email) {
            return false; // Reject sign-in if no email is present
            }
    
            // Check if the user already exists in the database
            const existingUser = await db.query.users.findFirst({
                where: eq(users.email, user.email),
            });
    
            if (!existingUser) {
                // Create a new user in the database
                const userId = uuidv4();
                await db.insert(users).values({
                    id: userId,
                    email: user.email,
                    isAdmin: false,
                    name: user.name || "",
                    image: user.image || null,
                    provider: "google",
                    providerId: profile?.sub,
                });

                await db.insert(customers).values({
                  id: uuidv4(),
                  userId: userId,
                  needInvoice: false,
                  paymentMethod: "",
                  direccion: null,
                  referencia: null,
                  name: user.name || "",
                  email: user.email,
                  phone: "",
                });
            }
        }
        return true;

    },
    jwt: async ({ token, user, account, profile, trigger, isNewUser, session }: JWTParams) => {
        // If the user is signing in, we can enrich the token with user data
        const dbUser = await db.query.users.findFirst({
            where: eq(users.email, token.email),
        });
        if (dbUser) {
            token.isAdmin = dbUser.isAdmin;
            token.userId = dbUser.id;
        } else {
            token.isAdmin = false; // Default to false if not found
        }

        console.log("JWT callback:", token);
    
        return token;
    },
    session: async ({ session, token }) => {
        console.log("Session callback:", session, token);
      session.user = {
        id: token.sub,
        ...(token),
      };
      return session;
    },
  },

  // 5. Events to handle user creation/update
  events: {
    async signIn({ user, account, profile, isNewUser }: SignInParams) {
        console.log("User signed in:", user, account, profile);
      if (account?.provider === "google" && user.email) {
        try {
          // Check if user exists
          const existingUser = await db.query.users.findFirst({
            where: eq(users.email, user.email),
          });

          if (!existingUser) {
            // Create new user
            const userId = uuidv4();
            await db.insert(users).values({
              id: userId,
              email: user.email,
              isAdmin: false,
              name: user.name || "",
              image: user.image || null,
              provider: "google",
              providerId: profile?.id,
            });

            // Create new customer

            await db.insert(customers).values({
              id: uuidv4(),
              userId: userId,
              needInvoice: false,
              paymentMethod: "",
              direccion: null,
              referencia: null,
              name: user.name || "",
              email: user.email,
              phone: "",
            });

          } else {
            // Update existing user
            await db.update(users)
              .set({
                name: user.name || existingUser.name,
                image: user.image || existingUser.image,
                provider: "google",
                providerId: profile?.id,
                updatedAt: new Date(),
              })
              .where(eq(users.email, user.email));
          }
        } catch (error) {
          console.error("Error saving user to database:", error);
        }
      }
    },
  },
}