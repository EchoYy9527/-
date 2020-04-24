// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    list:[],
    all:false,
    allPrice:0,
    allNum:0
  },
  onShow(){
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
  address(){
    // 获取用户地址
    wx.getSetting({
      success:(result)=>{
        const flag = result.authSetting["scope.address"]
        //判断用户是否拒绝授权 
        if(flag === true || flag === undefined){
            wx.chooseAddress({
              success:(resultes) =>{
                this.add = resultes
                wx.setStorageSync('add', this.add)
              },
            })
        }else{
          //打开权限页面  授权地址
          wx.openSetting({
            success:(result)=>{
              console.log(result)
              //打开地址
              wx.chooseAddress({
                success:(results) =>{
                  this.add = results
                  wx.setStorageSync('add', this.add)
                },
              })
            }
          })
        }
      }
    })
  },
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
  // 复选框
  change(e){
    console.log(e)
    const msg = e.currentTarget.dataset.id;
    let some=this.data.list[0];
    console.log(some)
    let index = some.findIndex(v =>v.goods_id === msg);
    console.log(index)
    //状态取反
    some[index].check = !some[index].check
    wx.setStorageSync('keyss', some)
    // let all = true;
    // // 数量  总价
    // let allNum=0;
    // let allPrice=0;
    // list.forEach(v=>{
    //   if(v[0].check){
    //     allPrice+=v[0].num*v[0].goods_price;
    //     allNum+=v[0].num
    //   }else{
    //     all = false
    //   }
    // })
    // all = list.length!=0? all :false
  }
}) 