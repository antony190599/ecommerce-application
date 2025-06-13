
import { getToken, JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function getUserViaToken(req: NextRequest) {
  const session = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as JWT;
  console.log("getUserViaToken - Session:", session);

  return session;
}