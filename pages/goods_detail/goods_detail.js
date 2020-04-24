// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    pics:[]
  },
  arr:[],
  images:[],
  getlist(msg){
    wx.request({
      url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id=${msg}`,
      success:(data)=>{
        let datas = data.data.message
        let picss = data.data.message.pics
        console.log(data)
        this.images = data.data.message.pics
        this.arr.push(datas) 
        this.setData({
          // 优化数据传输
          list:{
            goods_name:datas.goods_name,
            goods_price:datas.goods_price,
            //图片格式替换（最好后台更改）
            goods_introduce:datas.goods_introduce.replace(/\.webp/g,'.jpg')
          },
          // list:datas
          pics:picss
        })
      }
    })
  },
  // 图片放大预览
  picss(e){
    const img = this.images.map(v=>v.pics_mid)
    wx:wx.previewImage({
      urls: img,
      current:img[0]
    })
  },
  // 购物车
  shop(){
    console.log(this.arr)
    let message = wx.getStorageSync('keys') || []
    let index = message.findIndex(v =>v[0].goods_id === this.arr[0].goods_id)
    if(index === -1){
      console.log('压入数据')
      this.arr[0].num = 1
      this.arr[0].check = true
      message.push(this.arr)
    }else{
      // 存在数据
      message[index][0].num++
      console.log(index)
      console.log(message[index][0])
    }
    wx.setStorageSync('keys', message)
    wx.showToast({
      title: '加入成功',
      icon:'success',
      mask:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.getlist(goods_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})