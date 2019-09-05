// pages/see_more/see_more.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progress: '王市长已经同意把项目给我们了',
    workable: '有人从中阻挠，施工无法进行',
    supply: '货源充足',
    capital: '王市长那边需要1000万打点',
    invoice: '无',
    other: '没有其他的了',
  }, 
  onLoad:function(){
    var that = this
    wx.request({
      url: 'https://www.leishida.cn/get-report',
      method:'GET',
      data:{
        report_id:app.globalData.report_id
      },
      success:function(res){
        if(res.statusCode == 200){
          that.setData({
            progress:res.data.progress,
            workable:res.data.workable,
            supply:res.data.supply,
            capital:res.data.capital,
            invoice:res.data.invoice,
            other:res.data.other
          })
        }else{
          console.log(res.statusCode)
        }
      },
      fail:function(e){
        console.log(e)
        wx.showToast({
          title: '网络超时',
          icon:'none'
        })
      }
    })
  }
})