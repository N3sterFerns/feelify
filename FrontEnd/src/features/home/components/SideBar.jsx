import "../styles/sidebar.scss";

export default function Sidebar({ open, setOpen }) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>

      <div className="logo">
        <div className="text">
          <h2>Feelify</h2>
          <p>AI Music Dashboard</p>
        </div>
      </div>

      <nav>
        <a className="active">Home</a>
        <a>Explore</a>
        <a>Library</a>
      </nav>


      <div className="profile">
        <img src="https://i.pravatar.cc/100" />
        <div>
          <h4>Alex Rivera</h4>
          <button className="logout">Logout</button>
        </div>
      </div>

    </aside>
  );
}