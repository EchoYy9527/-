// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    list:[],
    allPrice:0,
    allNum:0
  },
  onShow(){
    console.log(1)
    const address = wx.getStorageSync("add")
    const list = wx.getStorageSync("keys") || []
    // 全选 空数组调用every方法也返回true
    // const all =list.length?list.every(v=>v[0].check):false;
    let all = true;
    // 数量  总价
    let allNum=0;
    let allPrice=0;
    list.forEach(v=>{
      if(v[0].check){
        allPrice+=v[0].num*v[0].goods_price;
        allNum+=v[0].num
      }else{
        all = false
      }
    })
    all = list.length!=0? all :false
    this.setData({
      allNum,
      allPrice,
      address,
      list,
      all
    })
  },
  add:{},

  //结算
  pay(){
    const {address,allNum} = this.data
    if(!address){
      wx.showToast({
        title: '您还没填写收货地址',
        icon:'none'
      })
    }else if(allNum === 0){
      wx.showToast({
        title: '您还没选择商品',
        icon:'none'
      })
    }else{
      wx.navigateTo({
        url: '/pages/pay/pay',
      })
    }
  },
}) 