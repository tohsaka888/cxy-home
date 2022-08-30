import { Flex } from '@components/Header/index.styled'
import { Spin, Skeleton, Avatar, Carousel, Typography } from 'antd'
import Image from 'next/image'
import React from 'react'
import BarGraph from './BarGraph'
import { CompetitionName, Container, Email, TimeLabel, Title, Username } from './index.styled'
import LiquidGraph from './LiquidGraph'
import ParticipantsTable from './ParticipantsTable'
import PieGraph from './PieGraph'
import WordCloudGraph from './WordCloudGraph'

type Props = {
  competition: Competition.Competition | null
}

function Detail({ competition }: Props) {
  return (
    <>
      <Flex>
        <Container style={{ marginRight: '16px' }}>
          {competition && <Flex>
            <div style={{ flex: 1 }}>
              <Carousel style={{ width: '500px' }}>
                {competition?.banners.map((banner, index) => {
                  return <Image src={banner.url} key={index} alt={'none'} width={500} height={300} />
                })}
              </Carousel>
            </div>
          </Flex>}
          {!competition && <>
            <Flex style={{ width: '500px', height: '250px', alignItems: 'center', justifyContent: 'center' }}>
              <Spin />
            </Flex>
          </>}
        </Container>
        <Container style={{ flex: 1 }}>
          {competition && <CompetitionName>{competition?.name}</CompetitionName>}
          {!competition && <>
            <Skeleton.Input style={{ width: '500px' }} />
            <Flex style={{ marginTop: '8px', alignItems: 'center' }}>
              <Skeleton.Avatar size={'large'} />
              <Skeleton.Input style={{ marginLeft: '8px', width: '200px' }} size={'small'} />
            </Flex>
            <Skeleton paragraph={{ rows: 5 }} />
          </>}

          {competition && <>
            <Flex style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Flex>
                <Avatar size={'large'} />
                <Flex style={{ marginLeft: '8px', flexDirection: 'column' }}>
                  <Username>{competition.creator.username}</Username>
                  <Email>{'<' + competition.creator.email + '>'}</Email>
                </Flex>
              </Flex>
              <Flex style={{ flexDirection: 'column' }}>
                <Flex style={{ fontSize: '14px' }}>
                  <TimeLabel>创建时间:</TimeLabel>
                  <a>{competition.createdTime}</a>
                </Flex>
                <Flex style={{ fontSize: '14px' }}>
                  <TimeLabel>更新时间:</TimeLabel>
                  <a>{competition.updatedTime}</a>
                </Flex>
              </Flex>
            </Flex>
            <Flex>
              <Typography.Paragraph style={{ marginTop: '16px' }} ellipsis={{ rows: 8 }}>
                {competition.intro}
              </Typography.Paragraph>
            </Flex>
          </>}
        </Container>
      </Flex>
      <Flex>
        <Container style={{ width: '300px', color: '#cecece', marginRight: '16px' }}>
          <Title style={{ color: '#000' }}>当前报名人数占限制人数比例</Title>
          {competition && <>
            <div style={{ height: '250px' }}>
              <LiquidGraph competition={competition} />
            </div>
          </>}
        </Container>
        <Container style={{ flex: 1 }}>
          <Title>奖项设置</Title>
          <Flex>
            <div style={{ width: '350px', height: '250px' }}>
              {competition && <PieGraph competition={competition} />}
            </div>
            <div style={{ flex: 1, height: '250px', marginLeft: '24px' }}>
              {competition && <BarGraph competition={competition} />}
            </div>
          </Flex>
        </Container>
      </Flex>
      <Flex>
        <Container style={{ marginRight: '16px', width: '600px' }}>
          <Title style={{ marginBottom: '8px' }}>报名用户词云</Title>
          {competition && <WordCloudGraph competition={competition} />}
        </Container>
        <Container style={{ flex: 1 }}>
          <Title style={{ marginBottom: '8px' }}>报名用户一览</Title>
          {competition && <ParticipantsTable competition={competition} />}
        </Container>
      </Flex>
    </>
  )
}

export default Detail