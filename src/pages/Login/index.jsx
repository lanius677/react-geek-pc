import { Button, Checkbox, Form, Input, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/react.svg'
//导入store
import { useStore } from '@/store';
//导入样式
import './index.scss'

const Login = () => {

  const { loginStore } = useStore()

  const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log('Success:', values);
    // values 放置的是所有表单中用户输入的内容
    try {
      await loginStore.getToken({
        mobile: values.username,
        code: values.password
      })
      // 跳转首页
      navigate('/', { replace: true })
      message.success('登录成功')
    } catch (error) {
      message.error(e.response?.data?.message || '登录失败')
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <Card className='login-container'>
        <img className='login-logo' src={logo} />
        {/* 登录表单 */}
        <Form
          validateTrigger={['onBlur', 'onChange']}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* 用户名区域 */}
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', validateTrigger: 'onBlur' }]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>

          {/* 密码区域 */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入验证码' },
            { len: 6, message: '请输入正确的验证码', validateTrigger: 'onBlur' }]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login