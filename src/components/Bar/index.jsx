// 封闭图表bar组件
import './index.scss'
// 思路
// 1. 把echarts加入项目
// 1.1 如何在react获取dom -> useRef
// 1.2 在什么地方获取don节点 -> useEffect
// 2. 不抽离定制化的参数，先把最小化的demo跑起来
// 3. 按照需求，哪些参数需要自定义 抽象出来

import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

//echarts初始化
function echartsInit(node, xData, sData, title){
  let myChart = echarts.init(node);
    // 基于准备好的dom，初始化echarts实例
    // 绘制图表
    myChart.setOption({
      title: {
        text: title
      },
      tooltip: {},
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: sData
        }
      ]
    });
}

function Bar() {
  useEffect(() => {
  }, [])

  return (
    <div ref={domRef} style={{ width: '500px', height: '400px' }}>

    </div>
  )

}

export default Bar