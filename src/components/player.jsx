import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    audioRef,
    seekbar,
    seekbg,
    track,
    playerStatus,
    play,
    pause,
    time,
    setTime,
    previous,
    next,
    seeksong,
  } = useContext(PlayerContext);

  useEffect(() => {
    const updateTime = () => {
      const audio = audioRef.current;
      const currentSeconds = Math.floor(audio.currentTime % 60);
      const currentMinutes = Math.floor(audio.currentTime / 60);
      const totalSeconds = Math.floor(audio.duration % 60);
      const totalMinutes = Math.floor(audio.duration / 60);

      setTime({
        currentTime: {
          second: currentSeconds,
          minute: currentMinutes,
        },
        totalTime: {
          second: totalSeconds || 0,
          minute: totalMinutes || 0,
        },
      });

      if (seekbar.current && seekbg.current) {
        const progress = (audio.currentTime / audio.duration) * 100 || 0;
        seekbar.current.style.width = `${progress}%`;
      }
    };

    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateTime);
      }
    };
  }, [audioRef, seekbar, seekbg, setTime]);

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt={track.name} />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="Shuffle" />
          <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="Previous" />
          {playerStatus ? (
            <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="Pause" />
          ) : (
            <img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt="Play" />
          )}
          <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="Next" />
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="Loop" />
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second.toString().padStart(2, "0")}
          </p>
          <div
            ref={seekbg} onClick={seeksong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <div ref={seekbar} className="h-1 border-none bg-green-800 rounded-full" />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second.toString().padStart(2, "0")}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.plays_icon} alt="Plays" />
        <img className="w-4" src={assets.mic_icon} alt="Mic" />
        <img className="w-4" src={assets.queue_icon} alt="Queue" />
        <img className="w-4" src={assets.speaker_icon} alt="Speaker" />
        <img className="w-4" src={assets.volume_icon} alt="Volume" />
        <div className="w-20 bg-slate-50 h-1 rounded" />
        <img className="w-4" src={assets.mini_player_icon} alt="Mini Player" />
        <img className="w-4" src={assets.zoom_icon} alt="Zoom" />
      </div>
    </div>
  );
};

export default Player;
