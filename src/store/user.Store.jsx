// 用户模块
import { makeAutoObservable, runInAction } from "mobx"
import { http } from '@/utils'

class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }


  async getUserInfo() {
    // 调用接口获取数据
    const res = await http.get('/user/profile')
    runInAction(() => {
      this.userInfo = res.data
    })
    // console.log('userInfo',this.userInfo)
  }
}

export default UserStore