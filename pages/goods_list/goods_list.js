// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    tab:[
      {
        id:0,
        value:'综合',
        isactive:true
      },
      {
        id:1,
        value:'销量',
        isactive:false
      },
      {
        id:2,
        value:'价格',
        isactive:false
      }
    ]
  },
  change(e){
    // console.log(e) 拿到子组件传递的参数
    const {index} = e.detail
    let {tab} = this.data
    console.log(this.list)
    tab.forEach((v,i)=>i===index? v.isactive = true : v.isactive = false)
    this.setData({
      tab
    })
  },
  //接口参数
  // params:{
  //   query:'',
  //   cid:'',
  //   pagenum:1,
  //   pagesize:10
  // },
  //请求
  getlist(msg){
    wx.request({
      url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/search?cid=${msg}`,
      success:(data)=>{
        this.setData({
          list:data.data.message.goods
        })
        //关闭刷新窗口
        wx:wx.stopPullDownRefresh()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let msg = options.cid
    console.log(msg)
    this.getlist(msg)
  },
  // 下拉刷新
  onPullDownRefresh(){
    // this.getlist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})