import "./DashBoard.css";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();

  function logOut() {
    navigate("/loginForm");
  }
  return (
    <div className="box">
      <h2>Welcome to DashBoard!</h2>
      <hr />
      <div className="centered">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
        consectetur corrupti hic aspernatur soluta incidunt, distinctio voluptas
        ducimus facilis deleniti suscipit dolores eaque, officiis cum saepe
        atque omnis iste in sed ad, nostrum quo? Eveniet saepe itaque sapiente
        placeat qui.
      </div>
      <hr />
      <center>
        <button className="submit" onClick={logOut}>
          Log Out
        </button>
      </center>
    </div>
  );
}

export default DashBoard;
