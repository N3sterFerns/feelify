import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import "../styles/sidebar.scss";

export default function Sidebar({ open, setOpen }) {
  const { user, getLogOut } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await getLogOut()
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>

      <div className="logo">
        <div className="text">
          <h2>Feelify</h2>
          <p>AI Music Dashboard</p>
        </div>
        {open && (
          <button
            className="close-btn"
            onClick={() => setOpen(prev => !prev)}
          >
            X
          </button>
        )}
      </div>

      <nav>
        <a className="active">Home</a>
      </nav>


      <div className="profile">
        <img src="profile.png" />
        <div>
          <h4>{user?.username}</h4>
          <button onClick={handleLogout} className="logout">Logout</button>
        </div>
      </div>

    </aside>
  );
}