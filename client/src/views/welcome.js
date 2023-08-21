import { useEffect } from "react";
import "../css/welcome_page.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserInfo } from "redux/userSlice";
import { verifyToken } from "api/verifyToken";

export function StartPage() {
  const token = useSelector((state) => state.userInfo.googleToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function validateToken() {
      const session = await verifyToken(token);
      console.log(session);
      if (!session) {
        dispatch(deleteUserInfo());
      }
    }
    validateToken();
  }, []);

  const handleClick = () => {
    if (token) {
      navigate("/note-editor");
    } else {
      navigate("/note-editor");
    }
  };

  return (
    <div className="wrapper">
      <button
        onClick={handleClick}
        sx={{
          backgroundColor: "#6558F5",
        }}
        className="customStartBtn"
        variant="contained"
      >
        START WRITTING
      </button>
    </div>
  );
}
