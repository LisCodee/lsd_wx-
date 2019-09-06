// pages/salesman_proj_detail/salesman_proj_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project_name: '雷士达项目管理系统',
    source: '王亚莉',
    contacts: '李景新',
    telephone: '110',
    introduction: '2019/08/30',
    report_record: [{ status: 0, report_id: '1', report_name: '雷士达项目管理系统', reporter: '王亚莉', time: '2019/08/30' }, { status: 0, report_id: '2', report_name: '雷士达项目管理系统', reporter: '王亚莉', time: '2019/09/30' }],
    voicemail_record: [{ status: 1, content: '留言信息', time: '2019/08/31' }, { status: 1, content: '留言信息', time: '2019/10/20' }],
    message: [],
    voicemail: ''
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://www.leishida.cn/single-project-detail',
      data: {
        project_id: app.globalData.project_id
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            project_name: res.data.project_name,
            source: res.data.source,
            contacts: res.data.contacts,
            telephone: res.data.telephone,
            introduction: res.data.introduction
          })
        } else {
          console.log(res.statusCode)
          wx.showToast({
            title: '请退出重试',
            icon: 'none'
          })
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
    wx.request({
      url: 'https://www.leishida.cn/single-project-report',
      data: { project_id: app.globalData.project_id },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            report_record: res.data
          })
        } else {
          console.log(res.statusCode)
          wx.showToast({
            title: '请刷新',
            icon: 'none'
          })
        }
      },
      fail: function (e) {
        console.log(e)
        wx.showToast({
          title: '网络超时，请重试',
          icon: 'none'
        })
      },
    })
    wx.request({
      url: 'https://www.leishida.cn/single-project-record',
      data: { project_id: app.globalData.project_id },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            voicemail_record: res.data
          })
        } else {
          console.log(res.statusCode)
          wx.showToast({
            title: '请刷新',
            icon: 'none'
          })
        }
      },
      fail: function (e) {
        console.log(e)
        wx.showToast({
          title: '网络超时，请重试',
          icon: 'none'
        })
      },
    })
    var result = app.combineArray(this.data.report_record, this.data.voicemail_record)
    this.setData({
      message: result
    })
  },
  see_more: function (e) {
    app.globalData.report_id = e.target.dataset.report_id
    console.log(app.globalData.report_id)
    wx.navigateTo({
      url: '../see_more/see_more',
    })
  }, 
  proj_report:function(){
    wx.navigateTo({
      url: '../proj_report/proj_report',
    })
  }
})