//Page Object
import { request } from '../../request/index'
Page({
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    cateList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function(options) {
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     console.log(result)
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
      
  },
  
  //获取轮播图数据
  getSwiperList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
    .then(result => {
      this.setData({
        swiperList:result.data.message
      })
    })
  },
  //获取分类导航数据
  getCateList(){
    request({url:"/catitems"})
    .then(result => {
      this.setData({
        cateList:result.data.message
      })
    })
  },
  //获取楼层数据
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result => {
      this.setData({
        floorList:result.data.message
      })
    })
  }
});
  