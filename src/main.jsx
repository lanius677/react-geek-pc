import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 先导入 antd 样式文件
// https://github.com/ant-design/ant-design/issues/33327
import 'antd/dist/antd.min.css'
// 再导入全局样式文件，防止样式覆盖！
import './index.scss'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
