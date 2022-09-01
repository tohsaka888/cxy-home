import { Flex } from '@components/Header/index.styled'
import { Spin, Skeleton, Avatar, Carousel, Tag, Button, message } from 'antd'
import Image from 'next/image'
import React, { useCallback, useMemo, useState } from 'react'
import BarGraph from './BarGraph'
import { CompetitionName, Container, Email, InfoContainer, InfoLabel, InfoText, TimeLabel, Title, Username } from './index.styled'
import LiquidGraph from './LiquidGraph'
import ParticipantsTable from './ParticipantsTable'
import PieGraph from './PieGraph'
import WordCloudGraph from './WordCloudGraph'
import moment from 'moment'
import { useRouter } from 'next/router'
import useLoginStatus from 'hooks/useLoginStatus'
import useIsSignUp from 'hooks/useIsSignUp'
import { competitionUrl } from '@config/baseUrl'

type Props = {
  competition: Competition.Competition | null
}

function Detail({ competition }: Props) {
  const router = useRouter()
  const username = useLoginStatus()
  const { isSignUp, loading } = useIsSignUp(router.query.id as string, username)
  const [isloading, setIsLoading] = useState<boolean>(false)

  const competitionStatus = useMemo(() => {
    if (competition) {
      const notStart = moment(moment.now()).isBefore(moment(competition.info.signUpStart))
      const isEnd = moment(moment.now()).isAfter(moment(competition.info.signUpEnd))
      const fitDate = moment(moment.now()).isBefore(moment(competition?.info.signUpEnd)) && moment(moment.now()).isAfter(moment(competition?.info.signUpStart))

      if (fitDate) {
        return '进行中'
      }

      if (notStart) {
        return '未开始'
      }

      if (isEnd) {
        return '已结束'
      }
    }
  }, [competition])

  const canSignUp = useMemo(() => {
    if (competition) {
      const fitDate = moment(moment.now()).isBefore(moment(competition?.info.signUpEnd)) && moment(moment.now()).isAfter(moment(competition?.info.signUpStart))
      const fitLimit = competition?.participants.length < competition?.info.limit
      if (fitDate && fitLimit) {
        return true
      } else {
        return false
      }
    }
  }, [competition])

  const signUp = useCallback(async () => {
    setIsLoading(true)
    if (username) {
      const res = await fetch(`${competitionUrl}/api/competition/signup/${router.query.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      })
      const data = await res.json()
      setIsLoading(false)
      if (data.success) {
        if (data.isSignUp) {
          message.success('参加成功')
        } else {
          message.error('参加失败')
        }
      } else {
        message.error(data.error)
      }
    } else {
      message.warning('请先登录!')
    }
  }, [router.query.id, username])

  const rejection = useCallback(async () => {
    setIsLoading(true)
    if (username) {
      const res = await fetch(`${competitionUrl}/api/competition/rejection/${router.query.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      })
      const data = await res.json()
      setIsLoading(false)
      if (data.success) {
        if (!data.isSignUp) {
          message.success('取消参加成功')
        } else {
          message.error('取消参加失败')
        }
      } else {
        message.error(data.error)
      }
    } else {
      message.warning('请先登录!')
    }
  }, [router.query.id, username])

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
          {competition && <>
            <Flex style={{ borderBottom: '1px solid #cecece', alignItems: 'center', marginBottom: '8px', paddingBottom: '8px', justifyContent: 'space-between' }}>
              <Flex style={{ alignItems: 'center' }}>
                <CompetitionName>{competition?.name}</CompetitionName>
                <Flex style={{ marginLeft: '8px' }}>
                  <Tag color="#f50">{competition?.info.way}</Tag>
                </Flex>
                <Flex>
                  <Tag color="#2db7f5">{competitionStatus || ''}</Tag>
                </Flex>
                <Flex>
                  {!isSignUp ? <Tag color="#87d068">{canSignUp ? '可报名' : '不可报名'}</Tag> : <Tag color="#87d068">已报名</Tag>}
                </Flex>
              </Flex>
              {!isSignUp
                ? <Button shape={'round'} type="primary" style={{ justifySelf: 'end' }} onClick={signUp} disabled={!canSignUp} loading={isloading}>报名比赛</Button>
                : <Button shape={'round'} type="primary" danger style={{ justifySelf: 'end' }} disabled={!canSignUp} onClick={rejection} loading={isloading}>取消报名</Button>
              }
            </Flex>
          </>}
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
            <Flex style={{ justifyContent: 'space-between', marginTop: '16px' }}>
              <InfoContainer>
                <InfoLabel>开始报名时间:</InfoLabel>
                <InfoText>{competition.info.signUpStart}</InfoText>
              </InfoContainer>
              <InfoContainer>
                <InfoLabel>结束报名时间:</InfoLabel>
                <InfoText>{competition.info.signUpEnd}</InfoText>
              </InfoContainer>
              <InfoContainer>
                <InfoLabel>比赛时间:</InfoLabel>
                <InfoText>{competition.info.time}</InfoText>
              </InfoContainer>
            </Flex>
            <Flex style={{ justifyContent: 'space-between' }}>
              <InfoContainer>
                <InfoLabel>比赛地点:</InfoLabel>
                <InfoText>{competition.info.place}</InfoText>
              </InfoContainer>
              <InfoContainer>
                <InfoLabel>限报人数:</InfoLabel>
                <InfoText>{competition.info.limit + ' 人'}</InfoText>
              </InfoContainer>
              <InfoContainer>
                <InfoLabel>比赛时长:</InfoLabel>
                <InfoText>{competition.info.duration}</InfoText>
              </InfoContainer>
            </Flex>
            {/* <Flex>
              <Typography.Paragraph style={{ marginTop: '16px' }} ellipsis={{ rows: 8 }}>
                {competition.intro}
              </Typography.Paragraph>
            </Flex> */}
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
          {!competition && <>
            <Flex style={{ justifyContent: 'center', alignItems: 'center', height: '250px' }}>
              <Spin />
            </Flex>
          </>}
        </Container>
        <Container style={{ flex: 1 }}>
          <Title>奖项设置</Title>
          <Flex>
            <div style={{ width: '350px', height: '250px' }}>
              {competition && <PieGraph competition={competition} />}
              {!competition && <>
                <Flex style={{ justifyContent: 'center', alignItems: 'center', height: '250px' }}>
                  <Spin />
                </Flex>
              </>}
            </div>
            <div style={{ flex: 1, height: '250px', marginLeft: '24px' }}>
              {competition && <BarGraph competition={competition} />}
              {!competition && <>
                <Flex style={{ justifyContent: 'center', alignItems: 'center', height: '250px' }}>
                  <Spin />
                </Flex>
              </>}
            </div>
          </Flex>
        </Container>
      </Flex>
      <Flex>
        <Container style={{ marginRight: '16px', width: '600px' }}>
          <Title style={{ marginBottom: '8px' }}>报名用户词云</Title>
          {competition && <WordCloudGraph competition={competition} />}
          {!competition && <>
            <Flex style={{ justifyContent: 'center', alignItems: 'center', height: '250px' }}>
              <Spin />
            </Flex>
          </>}
        </Container>
        <Container style={{ flex: 1 }}>
          <Title style={{ marginBottom: '8px' }}>报名用户一览</Title>
          {competition && <ParticipantsTable competition={competition} />}
          {!competition && <>
            <Flex style={{ justifyContent: 'center', alignItems: 'center', height: '250px' }}>
              <Spin />
            </Flex>
          </>}
        </Container>
      </Flex>
    </>
  )
}

export default Detail