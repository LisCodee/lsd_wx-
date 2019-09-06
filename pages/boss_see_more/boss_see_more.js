// pages/boss_see_more/boss_see_more.js
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
    voicemail:''
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://www.leishida.cn/get-report',
      method: 'GET',
      data: {
        report_id: app.globalData.report_id
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            progress: res.data.progress,
            workable: res.data.workable,
            supply: res.data.supply,
            capital: res.data.capital,
            invoice: res.data.invoice,
            other: res.data.other
          })
        } else {
          console.log(res.statusCode)
        }
      },
      fail: function (e) {
        console.log(e)
        wx.showToast({
          title: '网络超时',
          icon: 'none'
        })
      }
    })
  },
  leave_message:function(e){
    this.setData({
      voicemail:e.detail.value
    })
    console.log(this.data.voicemail)
  },
  send:function(e){
    var that = this
    if (this.data.voicemail == '') {
      wx.showToast({
        title: '请输入留言内容',
        icon: 'none'
      })
    } else {
      wx.request({
        url: 'https://www.leishida.cn/record',
        data: {
          project_id: app.globalData.project_id,
          content: that.data.voicemail
        },
        method: "POST",
        success: function (res) {
          if (res.statusCode == 200) {
            wx.showToast({
              title: '留言成功',
            })
            this.onLoad       //刷新页面
          } else {
            wx.showToast({
              title: '请重试',
              icon: 'none'
            })
            console.log(res.statusCode)
          }
        },
        fail: function (e) {
          console.log(e)
          wx.showToast({
            title: '网络超时',
            icon: 'none'
          })
        }
      })
    }
  }
})