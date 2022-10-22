// 导入路由
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// 导入页面组件
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'

import { AuthComponent } from '@/components/AuthComponent.jsx';

// 配置路由规则
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Layout需要鉴权处理的 */}
          <Route path="/" element={
            <AuthComponent>
              <Layout />
            </AuthComponent>} />
          {/* 这个不需要 */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App