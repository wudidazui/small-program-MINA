// pages/goods_list/index.js
import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid
    this.getGoodsList()
  },
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams})
    const total = res.data.message.total
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
    console.log(this.totalPages)
    console.log(res)
    this.setData({
      goodsList:[...res.data.message.goods,...res.data.message.goods]
    })
    wx.stopPullDownRefresh()
  },
  handleTabsItemChange(e){
    const index = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },
  //滚动条触底事件
  onReachBottom(){
    //判断有没有下一页数据
    if(this.QueryParams.pagenum>= this.totalPages){
      //没有下一页数据
      wx.showToast({title: '没有下一页数据'})
    }else{
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },
  //下拉刷新事件
  onPullDownRefresh(){
    //重置数组
    this.setData({
      goodsList:[]
    })
    //重置页码
    this.QueryParams.pagenum=1
    //重新发送请求
    this.getGoodsList()
  }


})