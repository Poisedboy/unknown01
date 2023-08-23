import axios from "axios";

const url = "http://localhost:8080";

const useAPI = {
  registerUser: async (user, token) => {
    try {
      const userData = { ...user, token: token };
      const response = await axios.post(`${url}/api/auth`, userData, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
      return response;
    } catch (e) {
      console.log("registerUser ", e);
    }
  },
  uploadSprint: async (
    sprint = { content: "empty sprint`s content" },
    userId = 123,
    token
  ) => {
    try {
      const postingData = { ...sprint, userId };

      const response = await axios.post(`${url}/api/post-sprint`, postingData, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });

      return response;
    } catch (e) {
      console.log("post Sprint error: ", e);
    }
  },
  fetchSprints: async (userId, token) => {
    try {
      const response = await axios.get(`${url}/api/${userId}/sprints`, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
      return response;
    } catch (e) {
      console.log("post Sprint error: ", e);
    }
  },
  sendUpdatedSprint: async (updatedSprint, token) => {
    try {
      const response = await axios.put(
        `${url}/api/update-sprint`,
        updatedSprint,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      return response;
    } catch (e) {
      console.log("update Sprint error: ", e);
    }
  },
  postServey: async (options, userId, token) => {
    try {
      const response = await axios.put(
        `${url}/api/post-servey`,
        { options: options, userId },
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      return response;
    } catch (e) {
      console.log("post Servey error: ", e);
    } finally {
      console.log("POST SERVEY");
    }
  },
};

export default useAPI;
