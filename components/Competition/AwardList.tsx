import { Button, Form, Input, Modal, Table } from 'antd'
import React, { useCallback, useState } from 'react'

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  winners: Competition.Winner[]
}

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    render: (_: any, __: any, index: number) => index + 1
  }, {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
  }, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: '奖项',
    dataIndex: 'award',
    key: 'award',
    filters: [
      { text: '一等奖', value: '一等奖' },
      { text: '二等奖', value: '二等奖' },
      { text: '三等奖', value: '三等奖' },
      { text: '优秀奖', value: '优秀奖' }
    ],
    onFilter: (value: any, record: Competition.Winner) => record.award.startsWith(value),
    filterSearch: true
  }
]

function AwardList({ visible, setVisible, winners }: Props) {
  const [searchParams, setSearchParams] = useState<{ username: string; email: string; }>({ username: '', email: '' })
  const [dataSource, setDataSource] = useState<Competition.Winner[]>(winners)

  const onSearch = useCallback(() => {
    setDataSource(
      searchParams.username === '' && searchParams.email === ''
        ? winners
        : winners.filter((winner) => (winner.username.includes(searchParams.username) && winner.email.includes(searchParams.email)))
    )
  }, [searchParams.email, searchParams.username, winners])

  return (
    <Modal visible={visible} footer={null} width={700} title={'获奖名单'}
      onCancel={() => setVisible(false)}
    >
      <Form layout='inline' style={{ position: 'relative', marginBottom: '16px' }}>
        <Form.Item label={'姓名'}>
          <Input placeholder='请输入姓名' value={searchParams.username} onChange={(e) => setSearchParams({ ...searchParams, username: e.target.value })} />
        </Form.Item>
        <Form.Item label={'邮箱'}>
          <Input placeholder="请输入邮箱" value={searchParams.email} onChange={(e) => setSearchParams({ ...searchParams, email: e.target.value })} />
        </Form.Item>
        <Button type={'primary'} style={{ position: 'absolute', right: '0px' }} onClick={onSearch}>搜索</Button>
      </Form>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ showQuickJumper: true, showSizeChanger: true, defaultPageSize: 5 }}
      />
    </Modal>
  )
}

export default AwardList