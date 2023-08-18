import "../css/welcome_page.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function StartPage() {
  const localToken = useSelector((state) => state.userInfo.googleToken);
  console.log(localToken);
  const navigate = useNavigate();

  const handleClick = () => {
    if (localToken) {
      navigate("/note-editor");
    } else {
      navigate("/authentication");
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
