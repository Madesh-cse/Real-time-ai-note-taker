import "../../style/Component/NavBar/_navbar.scss"

function Navbar() {
  return (
    <header className="nav">
      <a className="brand" href="/">
        <span className="brand-mark" aria-hidden="true"></span>
        <span className="brand-text">NovaMeet</span>
      </a>

      <nav className="nav-links">
        <a href="#features">Features</a>
        <a href="#ai-notes">AI Notes</a>
        <a href="#security">Security</a>
        <a href="#faq">FAQ</a>
      </nav>

      <div className="nav-cta">
        <a className="btn outline" href="/login">
          Login
        </a>
        <a className="btn solid" href="/register">
          Register
        </a>
      </div>
    </header>
  );
}

export default Navbar;
