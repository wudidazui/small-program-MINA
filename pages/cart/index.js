// pages/cart/index.js
import {getSetting,chooseAddress,openSetting} from '../../utils/asyncWx.js'

Page({
  // //点击收货按钮
  // handleChooseAddress(){
  //   //获取权限状态
  //   wx.getSetting({
  //     success:(result) =>   {
  //       const scopeAddress = result.authSetting["scope.address"]
  //       if(scopeAddress===true||scopeAddress===undefined){
  //         wx.chooseAddress({
  //           success:(result1) => {
  //             console.log(result1)
  //           }
  //         })
  //       }else{
  //         //用户以前拒绝过授予权限，先诱导用户打开授权页面
  //         wx.openSetting({
  //           success:(result2) => {
  //             wx.chooseAddress({
  //               success:(result3) => {
  //                 console.log(result3)
  //               }
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // }
   data:{
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
   },
   onShow(){
    //获取缓存中的收货地址信息
    const address = wx.getStorageSync("address")
    //获取缓存中的购物车数据
    const cart = wx.getStorageSync('cart')||[]
    console.log(cart)
    this.setData({
      address
    })
    this.setCart(cart)
   },
    async handleChooseAddress(){
      //获取权限状态
      try {
        const res1 = await getSetting()
        const scopeAddress = res1.authSetting["scope.address"]
        //判断权限状态
        if(scopeAddress===false){
          await openSetting()
        }
        //调用获取收货地址的api
        let address = await chooseAddress()
        address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
        //存入到缓存
        wx.setStorageSync("address",address)
      
      } catch (error) {
          console.log(error)
        }
    },
    // 商品的选中
    handleItemChange(e){
      const goods_id = e.currentTarget.dataset.id
      console.log(goods_id)
      let {cart} = this.data
      let index = cart.findIndex(v=>v.data.message.goods_id===goods_id)
      cart[index].checked=!cart[index].checked
      this.setCart(cart)
    },
    //设置购物车状态的同时重新计算底部工具栏的数据
    setCart(cart){
      let allChecked = true
      let totalPrice = 0
      let totalNum = 0
      cart.forEach(v => {
        if(v.checked){
          totalPrice+=v.num*v.data.message.goods_price
          totalNum +=v.num
        }else{
          allChecked=false
        }
      });
      allChecked=cart.length!=0?allChecked:false
      this.setData({
        cart,
        totalPrice,
        totalNum,
        allChecked
      })
      wx.setStorageSync("cart",cart)
    }

 
})
        
