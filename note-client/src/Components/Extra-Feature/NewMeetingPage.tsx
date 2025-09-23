import React, { useEffect, useState } from "react";
import "../../style/Component/Register/_newmeeting.scss";
import { useNavigate } from "react-router-dom";

const NewMeeting: React.FC = () => {
  const [meetingId, setMeetingId] = useState<string>("");
  const [meetingUrl, setMeetingUrl] = useState<string>("Generating…");
  const navigate = useNavigate();


  useEffect(() => {
    // Generate Meeting ID
    const id = Math.floor(Math.random() * 900000 + 100000).toString();
    setMeetingId(id);
    setMeetingUrl(`${window.location.origin}/meeting/${id}`);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(meetingUrl);
    alert("Meeting link copied!");
  };

  const startMeeting = () => {
    navigate(`/meeting/${meetingId}`);
  };

  return (
    <div className="new-meeting-page">
      {/* Box */}
      <div className="new-meeting-box">
        <h2>Here’s your joining information</h2>
        <p>
          Share this link with people you want to meet with. Save it so you can
          join later too.
        </p>

        <div className="meeting-link-box">
          <span>{meetingUrl}</span>
          <button className="copy-btn" onClick={copyLink}>
            Copy
          </button>
        </div>

        <button className="btn solid" onClick={startMeeting}>
          Start Meeting
        </button>
      </div>
    </div>
  );
};

export default NewMeeting;
