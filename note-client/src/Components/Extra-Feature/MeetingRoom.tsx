import React, { useRef, useState, useEffect } from "react";
import "../../style/Component/MeetingRoom/_meetingroom.scss";
import { FaVideo } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaDesktop } from "react-icons/fa6";

const MeetingRoom: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [videoOn, setVideoOn] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [captions, setCaptions] = useState<string>("");
  const [captionsOn, setCaptionsOn] = useState<boolean>(true);

  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleVideo = async () => {
    if (videoOn) {
      streamRef.current?.getVideoTracks().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setVideoOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: micOn,
        });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setVideoOn(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
  };

  const toggleMic = () => {
    if (!streamRef.current) return;
    streamRef.current
      .getAudioTracks()
      .forEach((track) => (track.enabled = !micOn));
    setMicOn(!micOn);
  };

  const hangUp = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setCaptions("");
    alert("Meeting ended!");
    window.location.href = "/new-meeting";
  };

  const shareScreen = async () => {
    if (!screenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        if (videoRef.current) videoRef.current.srcObject = screenStream;
        screenStream.getVideoTracks()[0].onended = () => {
          // Stop screen share when user stops
          if (videoRef.current) videoRef.current.srcObject = streamRef.current;
          setScreenSharing(false);
          setCaptions("");
        };
        setScreenSharing(true);
      } catch (err) {
        console.error("Error sharing screen:", err);
      }
    }
  };

  const toggleCaptions = () => {
    setCaptionsOn((prev) => !prev);
    if (captionsOn) {
      setCaptions("");
    }
  };

  useEffect(() => {
    if (!micOn || !captionsOn) {
      setCaptions("");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setCaptions(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
    };

    recognition.start();

    // Stop recognition on cleanup
    return () => {
      recognition.stop();
    };
  }, [micOn, captionsOn]);

  return (
    <div className="meeting-room">
      <div className="video-section">
        <video ref={videoRef} autoPlay playsInline muted={!micOn} />
        {captions && (
          <div className="live-captions" style={{ opacity: captions ? 1 : 0 }}>
            {captions}
          </div>
        )}
      </div>

      <div className="control-bar">
        <div className="meeting-header">
          {/* <span className="meeting-id">Meeting ID: {meetingId}</span> */}
          <span className="current-time">{currentTime}</span>
        </div>
        <div className="control-container">
          <button
            className={`control-btn ${videoOn ? "on" : "off"}`}
            onClick={toggleVideo}
          >
            {videoOn ? <FaVideo /> : <FaVideoSlash />}
          </button>

          <button
            className={`control-btn ${micOn ? "on" : "off"}`}
            onClick={toggleMic}
          >
            {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </button>

          <button
            className={`control-btn ${captionsOn ? "on" : "off"}`}
            onClick={toggleCaptions}
          >
            CC
          </button>

          <button
            className={`control-btn ${screenSharing ? "on" : "off"}`}
            onClick={shareScreen}
          >
            <FaDesktop />
          </button>

          <button className="control-btn hangup" onClick={hangUp}>
            <FaPhone />
          </button>
        </div>
        <div>
            <button>Mad</button>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
