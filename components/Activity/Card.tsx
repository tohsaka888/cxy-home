/*
 * @Author: tohsaka888
 * @Date: 2022-09-02 16:20:07
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-15 11:47:50
 * @Description: 请填写简介
 */

import { Email, Username } from '@components/Competition/index.styled';
import { Flex } from '@components/Header/index.styled';
import { avatarUrl } from '@config/global';
import { Avatar, Divider, Typography } from 'antd';
import Image from 'next/image';
import React from 'react'
import { ActivityName, Prefix, Time } from './index.styled';
import { Image as AntImage } from 'antd'

type Props = {
  activity: Activity.Activity;
}

function Card({ activity }: Props) {
  return (
    <>
      <ActivityName>
        <Prefix>#</Prefix>
        {activity.name}
      </ActivityName>
      <Flex style={{ alignItems: 'center' }}>
        <Avatar src={<Image src={avatarUrl} alt={'avatar'} />} size={'large'} />
        <Flex style={{ flexDirection: 'column', marginLeft: '8px' }}>
          <Username style={{ fontSize: '15px' }}>
            {activity.author}
          </Username>
          <Email>{'<' + (activity.email || '不可查看') + '>'}</Email>
        </Flex>
      </Flex>
      <Typography style={{ marginLeft: '50px', marginTop: '8px' }}>
        <Typography.Paragraph ellipsis={{ rows: 5, expandable: true, symbol: '展开' }}>
          {activity.intro}
        </Typography.Paragraph>
      </Typography>

      <div style={{ marginLeft: '50px', marginTop: '8px' }}>
        <AntImage.PreviewGroup >
          {activity.images.map((image, index) => {
            return <AntImage src={image.url} key={index} width={280} style={{ marginRight: '8px' }} />
          })}
        </AntImage.PreviewGroup>
      </div>

      <Flex style={{ flexDirection: 'column', alignItems: 'flex-end', marginTop: '16px' }}>
        <Time>首次发布于: {activity.createdTime}</Time>
        <Time>最后更新于: {activity.updatedTime}</Time>
      </Flex>
      <Divider />
    </>
  )
}

export default Card
