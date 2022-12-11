import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'

import img404 from '@/assets/404error.png'
import { useEffect, useState } from 'react'
import { http } from '@/utils'


const { Option } = Select
const { RangePicker } = DatePicker


const Article = () => {
  //频道列表管理
  const [channeList, setChanneList] = useState([])

  useEffect(() => {
    const loadChannelList = async () => {
      const res = await http.get('/channels')
      // console.log(res);
      setChanneList(res.data.channels)
    }
    loadChannelList()
  }, [])

  // 文章列表数据管理
  // 统一管理数据,将来修改给setList传对象
  const [article, setArticleList] = useState({
    list: [],
    count: 0
})

  // 文章参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  })



  useEffect(() => {
    const loadList = async () => {
      const res = await http.get('/mp/articles', { params })
      // console.log('loadList',res)
      const { results, total_count } = res.data
      setArticleList({
        list:results,
        count:total_count
      })
    }
    loadList()
  }, [params])

  const onFinish=(values)=>{
    console.log(values)
    const {channel_id,date,status}=values

    //数据处理
    const _params={}
    if(status!==-1){
      _params.status=status
    }

    if(channel_id){
      _params.channel_id=channel_id
    }

    if(date){
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }

    // 修改params代码 引起接口的重新发送 对象的合并是一个整体覆盖
    setParams({...params,..._params})
  }


  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]


  return (
    <div>
      {/* 筛选区域 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialvalues={{ status: null }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channeList.map((item) => (
                <Option value={item.id} key={item.id}>{item.name}</Option>

              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 文章列表区域 */}
      <Card title={`根据筛选条件共查询到 count 条结果${article.count}`}>
        <Table rowKey="id" columns={columns} dataSource={article.list}></Table>
      </Card>
    </div>
  )
}

export default Article