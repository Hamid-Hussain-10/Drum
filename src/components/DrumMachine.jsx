import { useState, useEffect, useCallback } from "react";
import './DrumMachine.css';

const pads = [
  { key: "Q", id: "Heater-1", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", id: "Heater-2", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", id: "Heater-3", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", id: "Heater-4", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4.mp3" },
  { key: "S", id: "Clap", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "D", id: "Open-HH", audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "Z", id: "Kick-n'-Hat", audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", id: "Kick", audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", id: "Closed-HH", audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
];

const DrumMachine = () => {
  const [display, setDisplay] = useState("");
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [volume, setVolume] = useState(0.5);

  const handleClick = useCallback((id, key) => {
    if (isPowerOn) {
      const audio = document.getElementById(key);
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play();
      setDisplay(id);
    }
  }, [isPowerOn, volume]);

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    setDisplay(`Volume: ${Math.round(newVolume * 100)}`);
  };

  const togglePower = () => {
    setIsPowerOn(!isPowerOn);
    setDisplay(isPowerOn ? "Power Off" : "Power On");
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isPowerOn) {
        const pad = pads.find((p) => p.key === event.key.toUpperCase());
        if (pad) {
          handleClick(pad.id, pad.key);
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPowerOn, handleClick]);

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="pad-container">
        {pads.map((pad) => (
          <div
            key={pad.id}
            className="drum-pad"
            id={pad.id}
            onClick={() => handleClick(pad.id, pad.key)}
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.audio}></audio>
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={togglePower}>{isPowerOn ? "Turn Off" : "Turn On"}</button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default DrumMachine;
