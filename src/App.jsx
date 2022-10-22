// 导入路由
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'

// 导入页面组件
import Login from '@/pages/Login'
import Layout from '@/pages/Layout/index'

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
              </AuthComponent>} ></Route>
            {/* 这个不需要 */}
            <Route path="/login" element={<Login />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App