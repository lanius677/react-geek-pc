// 导入路由
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css';

// 导入页面组件
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Home from '@/pages/Home'
import Article from '@/pages/Article';
import Publish from '@/pages/Publish'

import { AuthComponent } from '@/components/AuthComponent';

// 配置路由规则
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Layout需要鉴权处理的 */}
          <Route path="/*" element={
            <AuthComponent>
              <Layout />
            </AuthComponent>} >
              {/* 嵌套子路由 */}
            <Route index element={<Home />}></Route>
            <Route path='publish' element={<Publish />}></Route>
            <Route path='article' element={<Article />}></Route>
          </Route>
          {/* 这个不需要 */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App