import NextAuth, { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: { params: { scope: "openid" } },
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      checks: ["state", "nonce", "pkce"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          verificationLevel:
            profile["https://id.worldcoin.org/v1"].verification_level,
        };
      },
    },
  ],
  callbacks: {
    async signIn({ user }) {
      return true;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// // Replace this with your actual verification logic (e.g. using ethers.js)
// async function verifyWalletAuth(
//   address: string,
//   signature: string,
//   challenge: string
// ): Promise<boolean> {
//   // Verify that the signature corresponds to the address and challenge.
//   return true; // Implement real verification here.
// }

// const authOptions: NextAuthOptions = {
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     CredentialsProvider({
//       id: "wallet-auth",
//       name: "Wallet Auth",
//       // No need to define visible fields – mini app will supply these values directly.
//       credentials: {},
//       async authorize(credentials, req) {
//         // Expect the mini app to send address, signature, and challenge in the request body
//         // (or in the credentials object, if you call signIn with these parameters).
//         const { address, signature, challenge } = credentials as {
//           address: string;
//           signature: string;
//           challenge: string;
//         };

//         // If you prefer to read from req.body instead:
//         // const { address, signature, challenge } = req.body;

//         // Verify the payload (you must implement your own verification).
//         const isValid = await verifyWalletAuth(address, signature, challenge);
//         if (isValid) {
//           // Return a user object. You can use the wallet address as the unique id.
//           return { id: address, name: "Wallet User" };
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user }) {
//       return true;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token = { ...token, ...user };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = token;
//       return session;
//     },
//   },
//   debug: process.env.NODE_ENV === "development",
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
