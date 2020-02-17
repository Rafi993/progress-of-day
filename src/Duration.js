// @flow

import React from "react";

import { Select as StyledSelect, Option } from "./styles";

type Props = {
  value: string,
  handleChange: Function
};

const Duration = ({ value, handleChange }: Props) => {
  return (
    <StyledSelect value={value} onChange={handleChange}>
      <Option value="day">Day</Option>
      <Option value="week">Week</Option>
      <Option value="month">Month</Option>
      <Option value="year">Year</Option>
    </StyledSelect>
  );
};

export default Duration;
