import { useGoogleLogin } from "@react-oauth/google";

export const useVerifyGoogle = () => {
  const getToken = () => {
    let token;
    let expiresIn;

    useGoogleLogin({
      onSuccess: (tokenResponse) => {
        token = tokenResponse.access_token;
        expiresIn = tokenResponse.expires_in;
      },
    });
    console.log("expires in: ", expiresIn);
    console.log("token: ", token);
    return { token, expiresIn };
  };
  const getGoogleId = () => {
    let googleId;
    useGoogleLogin({
      onSuccess: (tokenResponse) => {
        googleId = tokenResponse.google_id;
      },
    });
    return googleId;
  };
  return { getToken, getGoogleId };
};
