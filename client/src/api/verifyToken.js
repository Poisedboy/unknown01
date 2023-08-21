export const verifyToken = async (token) => {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return false;
  } else if (response.ok) {
    return true;
  }
};
