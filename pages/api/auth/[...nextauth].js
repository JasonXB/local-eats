import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";
import { compare } from "bcryptjs";

export default NextAuth({
  // OAuth authentication providers...
  providers: [
    CredentialsProvider({
      // This async FN runs when we get a login request
      // Place your own verification logic inside
      async authorize(credentials) {
        // Extract the parameters used when calling signIn() which triggers this function
        const email = credentials.email;
        const password = credentials.password;

        // Connect to the database and grab hold of the db instance
        const client = await connectToDB();
        const db = client.db();

        // Search the users collection for a doc/account with the submitted email
        const user = await db.collection("users").findOne({ email });
        // If an account is not found, throw an error (will not cause a redirect thanks to a parmaeter in signIn())
        if (!user) {
          client.close();
          throw new Error("No user found for that email"); //!!! render something on UI
        }
        // If an account is found, check if the associated password's correct
        const hashedAccountPassword = user.password; // the PW saved on the account in the DB
        // Compare the login attempt password to the encrypted one in MongoDB
        const isValid = await compare(password, hashedAccountPassword);

        // If the passwords do not match, throw an error and close the db session
        if (!isValid) {
          client.close();
          throw new Error("Incorrect password"); //!!! render something on UI
        }
        // If password matches, the operation's a success so return an object
        client.close(); // close DB session
        return { email: user.email }; // USE TO ACCESS THE CURRENTLY LOGGED IN EMAIL
        // Place the user email inside- not the entire user obj (insecure)
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    // signOut: '/auth/signout',  //! see what happens on sign out
    error: "/error", // Error code passed in query string as ?error=
    verifyRequest: "/verify-request", // (used for check email message) //! see if we do this officially
    newUser: "/", // New users will be directed here on first sign in
  },
});
