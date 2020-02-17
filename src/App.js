// @flow

import React, { useState, useCallback } from "react";

import Duration from "./Duration";
import ProgressBar from "./ProgressBar";
import useInterval from "./useInterval";
import { calculateTiming, calculatePercentage } from "./utils";
import { GlobalStyle, App as StyledApp, Progress, Title } from "./styles";

const storedTiming = localStorage.getItem("timing");
const storedDuration = localStorage.getItem("duration");
const storedProgress = localStorage.getItem("progress");

const App = () => {
  const [timing, setTiming] = useState(storedTiming || "night");
  const [duration, setDuration] = useState(storedDuration || "day");
  const [progress, setProgress] = useState(storedProgress || "20");

  useInterval(() => {
    const newTimimg = calculateTiming();
    const percentage = calculatePercentage(duration);
    setProgress(percentage);
    setTiming(newTimimg);

    localStorage.setItem("timing", newTimimg);
    localStorage.setItem("progress", percentage);
    document.title = `${duration} - ${percentage}%`;
  }, 1000);

  const handleDuration = useCallback(
    (event: any) => {
      const { value } = event.target;
      setDuration(value);
      localStorage.setItem("duration", value);
    },
    [setDuration]
  );

  return (
    <>
      <GlobalStyle />
      <StyledApp timing={timing}>
        <Progress>
          <div>
            <Title>Progress of the</Title>
            <Duration value={duration} handleChange={handleDuration} />
          </div>
          <ProgressBar progress={progress} />
        </Progress>
      </StyledApp>
    </>
  );
};

export default App;
