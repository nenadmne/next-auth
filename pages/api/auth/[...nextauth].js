import CredentialProvider from "next-auth/providers/credentials";

import NextAuth from "next-auth";
import { connectToClient, userExists } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
      name: "credentials",
      authorize: async (credentials) => {
        console.log("credentials= ", credentials);

        const client = await connectToClient();
        const db = client.db();
        const user = await userExists(db, "users", {
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }
        console.log("user= ", user);

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Invalid password! Try again!");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
