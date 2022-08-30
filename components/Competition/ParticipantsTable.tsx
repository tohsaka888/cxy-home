import { Table } from 'antd'
import { uniqueId } from 'lodash';
import React from 'react'

type Props = {
  competition: Competition.Competition
}

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    render: (text: string, record: any, index: number) => index + 1
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
];

function ParticipantsTable({ competition }: Props) {
  return (
    <Table rowKey={(record, index) => uniqueId(record.username)} dataSource={competition.participants} columns={columns} pagination={{ pageSize: 5, showQuickJumper: true }} />
  )
}

export default ParticipantsTable