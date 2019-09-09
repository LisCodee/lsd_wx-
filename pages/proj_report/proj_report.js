// pages/proj_report/proj_report.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    report_name:'',
    progress:'',
    workable:'',
    supply:'',
    capital:'',
    invoice:'',
    other:'',
  },
  title_change:function(e){
    this.setData({
      report_name:e.detail.value
    })
  },
  progress_change:function(e){
    this.setData({
      progress:e.detail.value
    })
    console.log("progress:" + this.data.progress)
  },
  workable_change: function (e) {
    this.setData({
      workable: e.detail.value
    })
    console.log("workable:" + this.data.workable)
  },
  supply_change: function (e) {
    this.setData({
      supply: e.detail.value
    })
    console.log("supply:" + this.data.supply)
  },
  capital_change: function (e) {
    this.setData({
      capital: e.detail.value
    })
    console.log("capital:" + this.data.capital)
  },
  invoice_change: function (e) {
    this.setData({
      invoice: e.detail.value
    })
    console.log("invoice:" + this.data.invoice)
  },
  other_change: function (e) {
    this.setData({
      other: e.detail.value
    })
    console.log("other:" + this.data.other)
  },
  send:function(e){
    console.log("用户点击提交")
    console.log(app.globalData.project_id)
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/LSD/add_report/',      //https://www.leishida.cn/add-report
      data:{
        report_name:that.data.report_name,
        reporter:wx.getStorageSync("name"),
        project_id:app.globalData.project_id,
        report_id:app.globalData.report_id,
        progress:that.data.progress,
        workable:that.data.workable,
        supply:that.data.supply,
        capital:that.data.capital,
        invoice:that.data.invoice,
        other:that.data.other
      },
      method:"POST",
      success:function(res){        //成功回调函数
        if(res.statusCode == 200){
          if(res.data.status == true){
            wx.showToast({
              title: '汇报成功',
            })
            wx.redirectTo({
              url: '../salesman_index/salesman_index',
            })
          }
          else{
            console.log(res.data.status)
          }
        }
        else{
          console.log(res.statusCode)
        }
      },
      fail:function(e){
        wx.showToast({
          title: '网络超时，请重试',
          icon:'none'
        })
        console.log(e)
      }
    })
  }
})