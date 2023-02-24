import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { http } from '@/utils';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';

const { Option } = Select

const Publish = () => {
  const { channelStore } = useStore()
  //存在上传图片的列表
  const [fileList, setFileList] = useState([])
  const cacheImgList = useRef()
  const onUploadChange = ({ fileList }) => {
    console.log(fileList)
    setFileList(fileList)

    // 同时把图片列表存入仓库一份
    cacheImgList.current = fileList

  }

  // 切换图片
  const [imgCount, setImgCount] = useState(1)
  const radioChange = (e) => {
    // console.log('radio checked', e);
    // setFileList([])
    setImgCount(e.target.value)

    // 从仓库里取对应的图片数量 ，交给我们来渲染图片列表的fileList
    if (cacheImgList.current.length === 0) {
      return false
    }
    console.log(imgCount)

    // 这里的imgCount拿到的是上一次的值，正常逻辑判断不对
    if (e.target.value === 3) {
      setFileList(cacheImgList.current)
    } else if (e.target.value === 1) {
      const img = cacheImgList.current ? cacheImgList.current[0] : []
      setFileList([img])
    }
  }

  // 提交表单
  const onFinish = async (values) => {
    // console.log(value)
    // 数据的二次处理 重点是cover字段
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        image: fileList.map(item => item.response.data.url)
      }
    }

    // console.log(params)
    await http.post('/mp/articles?draft=false', params)
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          // 注意：此处需要为富文本编辑表示的 content 文章内容设置默认值
          initialValues={{ content: '', type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map(item => (
                <Option key={item.id} value={item.key}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}

          </Form.Item>
          {/* 这里的富文本组件 已经被Form.Item控制 */}
          {/* ReactQuill输入的内容 会在onFinished回调中收集起来 */}
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className='publish-quill'
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)