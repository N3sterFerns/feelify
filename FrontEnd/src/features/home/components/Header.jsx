import "../styles/header.scss";

export default function Header({ setOpen }) {
  return (
    <header className="header">

      <button
        className="menu-btn"
        onClick={() => setOpen(prev => !prev)}
      >
        ☰
      </button>

      <input placeholder="Search artists, songs, or moods..." />



    </header>
  );
}