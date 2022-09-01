import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { WordCloud } from '@ant-design/plots';
import { Empty } from 'antd';
import { Flex } from '@components/Header/index.styled';

type Props = {
  competition: Competition.Competition
}

const WordCloudGraph = ({ competition }: Props) => {

  const data = useMemo(() => {
    return competition.participants.map((participant) => ({
      name: participant.username,
      value: Math.random()
    }))
  }, [competition.participants])

  const config = {
    data,
    wordField: 'name',
    weightField: 'value',
    colorField: 'value',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8, 32] as [number, number],
      rotation: 0,
    },
    // 返回值设置成一个 [0, 1) 区间内的值，
    // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
    random: () => 0.5,

  };

  return <>
    {competition.participants.length !== 0 ? <WordCloud {...config} /> : <>
      <Flex style={{ alignItems: 'center', justifyContent: 'center', height: '80%' }}>
        <Empty description="暂无数据" />
      </Flex>
    </>}
  </>;
};

export default WordCloudGraph
