// login module
import { makeAutoObservable } from 'mobx'
import { http, setToken, getToken, clearToken } from '@/utils'
class LoginStore {
  //初始化时使用getToken储存到token中
  token = getToken || ''
  constructor() {
    // 响应式
    makeAutoObservable(this)
  }

  getToken = async ({ mobile, code }) => {
    // 调用登录接口
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', { mobile, code })
    console.log(res.data);
    // 存入token
    this.token = res.data.token
    //存入localStroage
    setToken(this.token)
  }

  loginOut = () => {
    this.token = ''
    clearToken()
  }
}

export default LoginStore
