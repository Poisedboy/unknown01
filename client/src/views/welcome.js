import { useEffect } from "react";
import "../css/welcome_page.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserInfo } from "redux/userSlice";
import { verifyToken } from "api/verifyToken";

export function StartPage() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function validateToken() {
      const session = await verifyToken(token);
      if (!session) {
        dispatch(deleteUserInfo());
      }
    }
    validateToken();
  }, []);

  const handleClick = () => {
    navigate("/note-editor");
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
