import axios from "axios";

// Helper function that calls an API route to create a new account in our DB
export async function createUser(email, password) {
  try {
    const response = await axios.post("/api/auth/signup", {
      //!!! this api route has been split into 2
      email,
      password,
    });
    return response;
  } catch (error) {
    alert("Something's gone wrong with the sign up process. Try again later");
  }
}
