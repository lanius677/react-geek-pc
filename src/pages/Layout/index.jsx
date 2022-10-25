import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import {Outlet, useNavigate,useLocation} from 'react-router-dom';

const { Header, Sider } = Layout

const GeekLayout = () => {

  //menu items
  // const items=[
  //   { label: <Link to='/'>数据概览</Link>, key: '1' }, // 菜单项务必填写 key
  //   { label: <Link to="/article">内容管理</Link>, key: '2' },
  //   { label: <Link to="/publish">发布文章</Link>, key: '3' },
  // ];

  const items=[
    { label: '数据概览', key: '/',icon:<HomeOutlined/> }, // 菜单项务必填写 key
    { label: '内容管理', key: '/article',icon:<DiffOutlined/> },
    { label: '发布文章', key: '/publish',icon:<EditOutlined/> },
  ];

  // 导航点击跳转事件
  const navigator=useNavigate()
  const clickMenu=(e)=>{
    // console.log(e);
    const {key}=e
    navigator(key)
  }

  const {pathname}=useLocation() // 默认是: /
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">user.name</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
            onClick={(e)=>clickMenu(e)}
          >
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由 */}
        <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default GeekLayout