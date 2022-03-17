import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "../helperFunctions/connectToDB";
import { compare } from "bcryptjs";
import { useGlobalContext } from "../../../state-management/globalContext";

export default NextAuth({
  // OAuth authentication providers...
  providers: [
    CredentialsProvider({
      // This async FN runs when we get a login request
      // Place your own verification logic inside, then handle errors on pages/auth/signin
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
          throw new Error("No account found using this email");
        }
        // Make sure the account is verified
        if (user.accountStatus === "pending") {
          client.close();
          throw new Error("The account tied to this email is not verified yet");
        }
        // If a verified account is found, check if the associated password's correct
        const hashedAccountPassword = user.password; // the PW saved on the account in the DB
        // Compare the login attempt password to the encrypted one in MongoDB
        const isValid = await compare(password, hashedAccountPassword);

        // If the passwords do not match, throw an error and close the db session
        if (!isValid) {
          client.close();
          throw new Error("Incorrect password");
        }
        // If password matches, the operation's a success so return an object
        
        client.close(); // close DB session
        // Place the user email inside- not the entire user obj (insecure)
        return { email: user.email };
        // USE THIS TO ACCESS THE CURRENTLY LOGGED IN EMAIL INSIDE API ROUTES + getSession
        /*
        import { getSession } from "next-auth/react";

        const session = await getSession({ req: req }); // equals falsy if logged off
        if (!session) {
            res.status(407).json({ message: "Not authenticated!" });
            return
        }
        const userEmail = session.user.email;
        */
      },
    }),
  ],
  pages: {
    error: "/auth/signupError", // Error code passed in query string as ?error=
    newUser: "/", // New users will be directed here on first sign in
  },
});
