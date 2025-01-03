import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekbg = useRef();
  const seekbar = useRef();
  const [track, setTrack] = useState(songsData[0]);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayerStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayerStatus(false);
  };

  const playwithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayerStatus(true);
  };




  const previous = async() => {
    if(track.id > 0){
        await setTrack(songsData[track.id-1]);
        await audioRef.current.play();
        setPlayerStatus(true);

    }
  }


  const next = async() => {
    if(track.id < songsData.length-1){
        await setTrack(songsData[track.id+1]);
        await audioRef.current.play();
        setPlayerStatus(true);

    }
  }

  const seeksong = async(e) => {
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekbg.current.offsetWidth)*audioRef.current.duration)
    

  }






  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setTime({
        currentTime: {
          second: Math.floor(audio.currentTime % 60),
          minute: Math.floor(audio.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audio.duration % 60),
          minute: Math.floor(audio.duration / 60),
        },
      });
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateTime);
      }
    };
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekbar,
    seekbg,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    playwithId,
    previous,
    next,
    seeksong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;