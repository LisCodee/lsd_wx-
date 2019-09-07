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
    report_record: [],
    voicemail_record: [],
    message: [],
    voicemail: ''
  },
  load: function () {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/LSD/single_project_detail',    //https://www.leishida.cn/LSD/single-project-detail
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
      url: 'http://127.0.0.1:8000/LSD/single_project_report',      //https://www.leishida.cn/single_project_report
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
        wx.request({
          url: 'http://127.0.0.1:8000/LSD/single_project_record',      //https://www.leishida.cn/single_project_record
          data: { project_id: app.globalData.project_id },
          method: "GET",
          success: function (mes) {
            if (mes.statusCode == 200) {
              that.setData({
                voicemail_record: mes.data
              })
            } else {
              console.log(mes.statusCode)
              wx.showToast({
                title: '请刷新',
                icon: 'none'
              })
            }
            var result = app.combineArray(that.data.report_record, that.data.voicemail_record)
            console.log("result:" + result)
            that.setData({
              message: result
            })
          },
          fail: function (e) {
            console.log(e)
            wx.showToast({
              title: '网络超时，请重试',
              icon: 'none'
            })
          },
        })
      },
      fail: function (e) {
        console.log(e)
        wx.showToast({
          title: '网络超时，请重试',
          icon: 'none'
        })
      },
    })

  },
  onLoad: function () {
    this.load()
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