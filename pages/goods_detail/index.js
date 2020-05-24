// pages/goods_detail/index.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    console.log(goods_id)

    this.getGoodsDetail(goods_id)
  },
  //获取商品详情数据
  async getGoodsDetail(goods_id){
    const  = await request({url:"/goods/detail",data:{goods_id}})
    console.log(res)
    const goodsObj = res.data.message
    console.log(goodsObj)
    this.GoodsInfo = goodsObj
    this.setData({
      goodsObj
    })
  }, 
  //点击轮播图 放大预览 
  handlePreviewImage(e){
    const urls = this.GoodsInfo.data.message.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },
  handleCartAdd(){
     //获取缓存中的购物车数组
    let cart = wx.getStorageSync('cart')||[]
    //判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    console.log(index)
      if(index===-1){
        //不存在，第一次参加
        this.GoodsInfo.num = 1
        this.GoodsInfo.checked = true
        cart.push(this.GoodsInfo)
      }else{
        //已经存在购物车数据，执行num++
        cart[index].num++
      }
      //把购物车重新添加回缓存中
      wx.setStorageSync('cart', cart)
      //弹框提示
      wx.showToast({
        title: '加入成功',
        icon:"success",
        mask:true
      })
  }
})