<template>
  <el-row class="home" :gutter="20">
    <el-col class="user" :span="8" style="margin-top:20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">admin</p>
            <p class="access">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2000-1-1</span></p>
          <p>上次登录地点:<span>cn</span></p>
        </div>
      </el-card>
      <el-card style="margin-top:20px; height:360px;">
        <el-table :data="tableData">
          <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col style="margin-top:20px" :span="16">
      <div class="number">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display:'flex',padding:0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
              <p class="num">￥{{item.value}}</p>
              <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>

      <el-card style="height:280px">
        <div style="height:280px" ref="echarts"></div>
      </el-card>
      <div class="graph">
          <el-card>
            <div style="height:240px" ref="userEcharts"></div>
          </el-card>
          <el-card>
            <div style="height:240px" ref="videoEcharts"></div>
          </el-card>
      </div>
    </el-col>

  </el-row>

</template>

<script>
import { getData} from '../../api/data.js'
import * as echarts from 'echarts'
  export default{
    data() {
      return{
        userImg:require('../../assets/logo.png'),
        tableData:[
          {
            name:'小米',
            todayBuy:100,
            monthBuy:100,
            totalBuy:100,
          },
          {
            name:'苹果',
            todayBuy:100,
            monthBuy:100,
            totalBuy:100,
          },
          {
            name:'三星',
            todayBuy:100,
            monthBuy:100,
            totalBuy:100,
          },    
        ],
        tableLabel:{
          name:'课程',
          todayBuy:'今日购买',
          monthBuy:'本月购买',
          totalBuy:'总购买'
        },
        countData:[
          {
            name:"今日支付订单",
            value:1234,
            icon:"success",
            color:"#2ec7c9"
          },
          {
            name:'今日收藏订单',
            value:123,
            icon:'star-on',
            color:'#ffb980'
          },
          {
            name:'今日未支付订单',
            value:114,
            icon:'s-goods',
            color:'#5ab1ef'
          },
          {
            name:'本月支付订单',
            value:114,
            icon:'success',
            color:'#2ec7c9'
          },
          {
            name:'本月收藏订单',
            value:159,
            icon:'star-on',
            color:'#ffb980'
          },
          {
            name:'本月未支付订单',
            value:1564,
            icon:'s-goods',
            color:'#5ab1ef'
          }
        ]
      }
    },
    mounted() {
      getData().then(res =>{
        const {code,data} = res.data
        if (code === 20000){
          this.tableData = data.tableData
          const order = data.orderData
          const xDta = order.date
          const keyarray = Object.keys(order.data[0])
          const series = []
          keyarray.forEach(key =>{
            series.push({
              name:key,
              data:order.data.map(item => item[key]),
              type:'line'
            })
          })
          const option = {
            xAxis:{
              data:xDta
            },
            yAxis:{},
            legend:{
              data:keyarray
            },
            series
          }

          const E = echarts.init(this.$refs.echarts)
          E.setOption(option)

          // 用户图
          const userOption = {
            legend:{
              textStyle:{
                color:"#333",
              }
            },
            grid:{
              left:"20%"
            },
            tooltip:{
              trigger:"axis"
            },
            xAxis:{
              type:"category",
              data:data.userData.map(item => item.date),
              axisLine:{
                lineStyle:{
                  color:'#17b3a3'
                }
              },
              axisLabel:{
                interval:0,
                color:'#333'
              }
            },

            yAxis:[
              {
                type:"value",
                axisLine:{
                  lineStyle:{
                    color:'#17b3a3'
                  }
                }
              },
            ],
            color:["#2ec7c9","#b6a2de"],
            series:[
              {
                name:'新增用户',
                data:data.userData.map(item => item.new),
                type:'bar'
              },
              {
                name:'活跃用户',
                data:data.userData.map(item => item.active),
                type:'bar'
              }
            ]
          }
          const U = echarts.init(this.$refs.userEcharts)
          U.setOption(userOption)

          // 饼图
          const videoOption = {
            tooltip:{
              trigger:"item",
            },
            color:[
              "#0f78f4",
              "#dd536b",
              "#9462e5",
              "#a6a6a6",
              "#e1bb22",
              "#39c362",
              "#3ed1cf"
            ],
            series:[
              {
                data:data.videoData,
                type:'pie'
              }
            ]
          }
          const V = echarts.init(this.$refs.videoEcharts)
          V.setOption(videoOption)
        }
      })
    }
  }
</script>

<style lang="less" scoped>
.user{
  .el-card{
    height: 320px;
    .user{
      width: 75%;
      display: flex;
      position: relative;
      img{
        box-shadow: 1px 1px 5px rgb(206, 206, 206);
        border-radius: 10%;
      }
      .userinfo{
        position:absolute;
        bottom: 0;
        right: 0;
        .name{

        }
        .access{

        }
      }
    }
  }
}
.number{
  .el-card{
    width: 30%;
    text-align: center;
    display: inline-block;
    margin:0 5px;
    .icon{
      width:30%;
      font-size: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .detail{
      padding: 10px;
      // float:left;
      .num{
        font-size: 20px;
        padding: 0;
        margin: 0;

      }
      .txt{
        padding: 0;
        margin: 0;
        font-size: 10px;
        color: rgb(179, 179, 179);

      }
    }
  }
}
.graph{
  display: flex;
  padding: 5px;
  margin-top: 10px;
  .el-card{
    // flex: 1;
    width: 50%;
    height: 260px;
    margin: 0 10px;
  }
}
  
</style>