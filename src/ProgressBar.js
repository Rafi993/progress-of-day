// @flow

import React from "react";

import { ProgressBar as StyledProgressBar, Completion } from "./styles";

type Props = {
  progress: number
};

const ProgressBar = ({ progress }: Props) => {
  return (
    <StyledProgressBar>
      <div>
        <Completion progress={progress} />
      </div>
      <span>{progress}%</span>
    </StyledProgressBar>
  );
};

export default ProgressBar;
