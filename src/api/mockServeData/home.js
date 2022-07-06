import Mock from 'mockjs'

let list = []
export default {
  getStatisticalData:() => {
    for (let i = 0;i < 7; i++){
      list.push(
        Mock.mock({
          苹果:Mock.Random.float(100,8000,0,0),
          小米:Mock.Random.float(100,8000,0,0),
          三星:Mock.Random.float(100,8000,0,0),
        })
      )
    }
    return {
      code:20000,
      data:{
        videoData:[
          {
            name:'小米',
            value:2999
          },
          {
            name:'苹果',
            value:5999
          },
          {
            name:'三星',
            value:4999
          }
        ],
        // 柱状图
        userData:[
          {
            date:'周一',
            new:5,
            active:200
          },
          {
            date:'周二',
            new:2,
            active:250
          },
          {
            date:'周三',
            new:4,
            active:20
          },
          {
            date:'周四',
            new:50,
            active:390
          },
          {
            date:'周五',
            new:60,
            active:400
          },
          {
            date:'周六',
            new:65,
            active:500
          },
          {
            date:'周日',
            new:55,
            active:410
          },
        ],
        // 折线图
        orderData:{
          date:[20191001,20191002,20191003,20191004,20191005,20191006,20191007],
          data:list
        },
        tableData:[
          {
            name:'小米',
            todayBuy:100,
            monthBuy:200,
            totalBuy:300,
          },
          {
            name:'苹果',
            todayBuy:150,
            monthBuy:250,
            totalBuy:350,
          },
          {
            name:'三星',
            todayBuy:200,
            monthBuy:250,
            totalBuy:300,
          }
        ]
      }
    }
  }
}