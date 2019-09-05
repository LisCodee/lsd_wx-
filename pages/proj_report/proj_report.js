// pages/proj_report/proj_report.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progress:'',
    workable:'',
    supply:'',
    capital:'',
    invoice:'',
    other:'',
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
    var that = this
    wx.request({
      url: 'https://www.leishida.cn/add-report',
      data:{
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
          if(res.status == true){
            wx.showToast({
              title: '汇报成功',
            })
            wx.redirectTo({
              url: '../salesman_index/salesman_index',
            })
          }
          else{
            console.log(res.status)
          }
        }
        else{
          console.log(res.statusCode)
        }
      },
      fail:function(e){
        console.log(e)
      }
    })
  }
})