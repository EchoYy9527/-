// 将其requert方法返回出去  params 地址
export const request=(add)=>{
  const urls = "https://api-hmugo-web.itheima.net/api/public/v1/"
  return new Promise((resolve,reject)=>{
    wx.request({
      // url地址
      ...add,
      url:urls+add.url,
      //成功后执行的方法
      success:(data)=>{
        resolve(data)
      },
      //失败后执行的方法
      fail:(err)=>{
        reject(err)
      }
    })
  })
}