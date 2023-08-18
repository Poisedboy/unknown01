import axios from "axios";

const url = "http://localhost:8080";

const useAPI = {
  registerUser: async (user, token) => {
    try {
      console.log("token", token);
      const userData = { ...user, token: token };
      const response = await axios.post(`${url}/api/auth`, userData, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
      return response;
    } catch (e) {
      console.log("registerUser ", e);
    } finally {
      console.log("register user");
    }
  },
  uploadSprint: async (
    sprint = { content: "empty sprint`s content" },
    userGoogleId = 123
  ) => {
    try {
      console.log("userID inside postSprint: ", userGoogleId);
      console.log("sprint inside postSprint: ", sprint);

      const postingData = { ...sprint, userGoogleId };

      const response = await axios.post(`${url}/api/post-sprint`, postingData, {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      });

      return response;
    } catch (e) {
      console.log("post Sprint error: ", e);
    } finally {
      console.log("post sprint");
    }
  },
};

export default useAPI;
