import {makeAutoObservable} from 'mobx';
import {http} from '@/utils'
class ChannelStore{
  channelList=[]
  constructor(){
    makeAutoObservable(this)
  }

  loadChannelList=async ()=>{
    const res=await http.get('/channels')
    console.log(res)
    this.channelList=res.data.channels
  }
}

export default ChannelStore