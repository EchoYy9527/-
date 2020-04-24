import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 距离顶部
    num:0,
    myindex:0,
    //左菜单
    cateList:[],
    //右数据
    cateLists:[]
  },
  // 接收返回数据 之后分离
  arr:[],
  tap(e){
    // 解构赋值  获取下标
    const {index} = e.currentTarget.dataset
    //变量接收数据
    let right = this.arr[index].children
    this.setData({
      myindex:index,
      cateLists:right,
      //设置右侧返回顶部
      num:0
    })
    

  },
  //获取分类数据
  getCates(){
    request({
      url:"categories",
    }).then((data) =>{
      this.arr=data.data.message
      // 存储数据
      wx.setStorageSync('key', {time:Date.now(),data:this.arr})
      //重新编译数组里的值 并返回给left 左侧
      let left = this.arr.map(v =>v.cat_name)
      // 右侧
      let right = this.arr[0].children
      this.setData({
        cateList:left,
        cateLists:right
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cate = wx.getStorageSync('key')
    // 判断
    if(!cate){
      this.getCates()
    }else{
      // 有旧数据 判断是否过期
      if(Date.now()-cate.time>1000*10){
        this.getCates()
      }else{
        // 使用旧数据
        this.arr = cate.data
        console.log(1);
        let left = this.arr.map(v =>v.cat_name)
        let right = this.arr[0].children
        this.setData({
          cateList:left,
          cateLists:right
        })
      }
    }
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