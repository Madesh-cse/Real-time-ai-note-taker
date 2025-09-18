import "../../style/Component/Register/_home.scss";
import HomeCard from "../Extra-Feature/HomeCard";
import Footer from "../Footer/Footer";

const AuthenticatedHome: React.FC = () => {
  const goJoinFromHero = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const meetingIdInput = (
      document.getElementById("meetingIdInput") as HTMLInputElement
    ).value;

    if (!meetingIdInput) {
      alert("Please enter a meeting ID");
      return;
    }

    // redirect to meeting
    window.location.href = `/meeting/${meetingIdInput}`;
  };

  const handleNewMeeting = () => {
    // generate random meeting ID
    const newMeetingId = Math.floor(100000 + Math.random() * 900000).toString();
    window.location.href = `/meeting/${newMeetingId}`;
  };

  return (
    <section className="home-bg">
      <section className="hero">
        <div className="hero-content">
          <h1>Fast, reliable meetings for teams of any size</h1>
          <p className="lead">
            HD video, crisp audio, and built-in AI notes—all wrapped in a clean,
            Zoom-like experience.
          </p>

          <form className="join-form" onSubmit={goJoinFromHero}>
            <input
              id="meetingIdInput"
              type="text"
              placeholder="Enter Meeting ID"
              inputMode="numeric"
              aria-label="Meeting ID"
            />
            <button className="btn solid" type="submit">
              Join
            </button>
            <span className="or">or</span>
            <button
              className="btn outline"
              type="button"
              id="newMeetingBtn"
              onClick={handleNewMeeting}
            >
              New Meeting
            </button>
          </form>

          <ul className="hero-bullets">
            <li>One-click screen share</li>
            <li>AI summaries &amp; action items</li>
            <li>Secure by default</li>
          </ul>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <svg viewBox="0 0 700 460" className="mockup">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0b63f6" />
                <stop offset="100%" stopColor="#5cb3ff" />
              </linearGradient>
            </defs>
            <rect
              x="0"
              y="0"
              width="700"
              height="460"
              rx="20"
              fill="url(#g1)"
            />
            <rect
              x="16"
              y="16"
              width="668"
              height="60"
              rx="12"
              fill="rgba(255,255,255,.12)"
            />
            <g transform="translate(16,92)" fill="rgba(255,255,255,.9)">
              <rect
                x="0"
                y="0"
                width="328"
                height="180"
                rx="14"
                fill="rgba(255,255,255,.15)"
              />
              <rect
                x="340"
                y="0"
                width="328"
                height="180"
                rx="14"
                fill="rgba(255,255,255,.15)"
              />
              <rect
                x="0"
                y="192"
                width="328"
                height="160"
                rx="14"
                fill="rgba(255,255,255,.15)"
              />
              <rect
                x="340"
                y="192"
                width="328"
                height="160"
                rx="14"
                fill="rgba(255,255,255,.15)"
              />
            </g>
            <rect
              x="16"
              y="372"
              width="668"
              height="72"
              rx="12"
              fill="rgba(255,255,255,.12)"
            />
          </svg>
        </div>
      </section>
      <section className="logos">
        <p>Trusted for 10,000+ meetings</p>
        <div className="logo-row">
          <span className="lo">Acme</span>
          <span className="lo">Orbit</span>
          <span className="lo">Nimbus</span>
          <span className="lo">Helix</span>
          <span className="lo">Pulse</span>
          <span className="lo">Vertex</span>
        </div>
      </section>
      <HomeCard/>
      <Footer/>
    </section>
  );
};

export default AuthenticatedHome;
