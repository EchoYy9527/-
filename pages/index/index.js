//引入request 脚本函数
import { request } from "../../request/index.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    cateList:[],
    commList:[]
  },
  // 轮播图数据
  getSwiper(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success:(data)=>{
        this.setData({
          swiperList:data.data.message
        })
      }
    })
  },
  //导航数据
  getCatelist(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
      .then(data=>{
        this.setData({
          cateList:data.data.message
      })
    })
  },
  // 商品数据
  getComm(){
    request({url:"home/floordata"})
      .then(data=>{
        console.log(data.data)
        this.setData({
          commList:data.data.message
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //使用 request脚本函数
    this.getSwiper()
    this.getCatelist()
    this.getComm()
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