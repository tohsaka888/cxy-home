import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/plots';

type Props = {
  competition: Competition.Competition
}

const BarGraph = ({ competition }: Props) => {
  const data = useMemo(() => {
    return competition.awardSetting.map((award) => ({
      type: award.award,
      value: award.limit
    }))
  }, [competition.awardSetting])
  const config = {
    data,
    xField: 'value',
    yField: 'type',
    seriesField: 'type',
    legend: {
      position: 'right' as 'right'
    }
  };
  return <Bar {...config} />;
};

export default BarGraph