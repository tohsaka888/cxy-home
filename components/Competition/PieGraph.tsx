import React, { useState, useEffect, CSSProperties, useMemo } from 'react';
import { Pie, measureTextWidth } from '@ant-design/plots';

type Props = {
  competition: Competition.Competition
}

const PieGraph = ({ competition }: Props) => {
  function renderStatistic(containerWidth: number, text: string, style: CSSProperties) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }

  const data = useMemo(() => {
    return competition.awardSetting.map(award => ({
      type: award.award,
      value: award.limit
    }))
  }, [competition])

  const config = {
    appendPadding: 8,
    data,
    angleField: 'value',
    colorField: 'type',
    color: ['#d62728', '#e7e324', '#1890ff', '#7cd38b'],
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v: string | number) => `${v}`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: 0,
        customHtml: (container: HTMLElement, view: any, datum: any, data: any) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '总计';
          return renderStatistic(d, text, {
            fontSize: 24,
          });
        },
      },
      content: {
        offsetY: 2,
        style: {
          fontSize: '24px',
        },
        customHtml: (container: HTMLElement, view: any, datum: any, data: any) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `${datum.value}人` : `${data.reduce((r: any, d: any) => r + d.value, 0)}人`;
          return renderStatistic(width, text, {
            fontSize: 24,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export default PieGraph
