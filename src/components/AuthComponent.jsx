// <AuthComponent> <Layout/> </AuthComponent>
// 登录：<><Layout/></>
// 非登录：<Navigate to="/login" replace />

// 高阶组件:把一个组件当成另外一个组件的参数传入 然后通过一定的判断 返回新的组件
import { getToken } from '@/utils';

import { Navigate } from 'react-router-dom';

const AuthComponent = ({ childen }) => {
  const isToken = getToken()
  // 1. 判断token是否存在
  if (isToken) {
    // 2. 如果存在，直接正常渲染
    return <>{childen}</>
  } else {
    // 3. 如不存在，重定向登录路由
    return <Navigate to="/login" replace />
  }
}

export {AuthComponent}