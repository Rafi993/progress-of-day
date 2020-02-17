// @flow

import React, { useState, useEffect, useCallback } from "react";

import Duration from "./Duration";
import ProgressBar from "./ProgressBar";
import { GlobalStyle, App as StyledApp, Progress, Title } from "./styles";

const storedTiming = localStorage.getItem("timing");
const storedDuration = localStorage.getItem("duration");

const App = () => {
  const [timing, setTiming] = useState(storedTiming || "night");
  const [duration, setDuration] = useState(storedDuration || "day");
  const [progress, setProgress] = useState(20);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  useEffect(() => {});

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
