// pages/category/index.js
import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightContent:[],
    currentIndex:0,
    scrollTop:0
  },
  //接口的返回数据
  Cates:[],
  onLoad:function(option){
    //获取本地存储中的数据
    const Cates = wx.getStorageSync("cates");
    //判断
    if(!Cates){
      //不存在 发送请求获取数据
      this.getCates()
    }else{
      if(Date.now()-Cates.time>1000*10){
        this.getCates()
      }else{
        this.Cates=Cates.data
        let leftMenuList = this.Cates.map(v=>v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  //获取分类数据
  async getCates(){
    // request({
    //   url:"/categories"
    // })
    // .then(res => {
    //   this.Cates = res.data.message
    //   //把接口的数据存入到本地接口中
    //   wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
        
    //   let leftMenuList = this.Cates.map(v=>v.cat_name)
    //   let rightContent = this.Cates[0].children
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    const res = await request({url:"/categories"})
    this.Cates = res.data.message
      //把接口的数据存入到本地接口中
    wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
        
    let leftMenuList = this.Cates.map(v=>v.cat_name)
    let rightContent = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  //左侧菜单的点击事件
  handleItemTap(e){
    const index = e.currentTarget.dataset.index
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })

  }
})