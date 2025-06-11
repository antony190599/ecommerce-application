import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  // 1. Proveedor Google
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  // 2. Configuración de sesión mediante JWT
  session: {
    strategy: "jwt",
  },

  // 3. Secreto para firmar y cifrar JWT
  secret: process.env.NEXTAUTH_SECRET,

  // 4. Callbacks para enriquecer token y sesión
  callbacks: {
    jwt: async ({ token, account, profile }) => {
      if (account && profile) {
        token.id = profile.sub;
        token.email = profile.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };