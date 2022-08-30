import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'
const Liquid = dynamic(() => import('@ant-design/plots').then(mod => mod.Liquid), { ssr: false })

type Props = {
  competition: Competition.Competition
}

const swtichColor = (percent: number) => {
  if (percent >= 0 && percent <= 0.4) {
    return '#1890ff'
  } else if (percent > 0.4 && percent <= 0.7) {
    return '#fcb90f'
  } else if (percent > 0.7 && percent <= 1) {
    return '#e72222'
  }
}

function LiquidGraph({ competition }: Props) {

  const liquidConfig = useMemo(() => {
    return {
      percent: competition.participants.length / competition.info.limit,
      outline: {
        border: 4,
        distance: 4,
      },
      liquidStyle: {
        fill: swtichColor(competition.participants.length / competition.info.limit)
      },
      color: swtichColor(competition.participants.length / competition.info.limit),
      wave: {
        length: 128,
      },
    };
  }, [competition.info.limit, competition.participants.length])

  return (
    <Liquid  {...liquidConfig} />
  )
}

export default LiquidGraph