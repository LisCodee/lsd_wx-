// pages/salesman_voicemail/salesman_voicemail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color:'red',
    voicemail: [],
  },
  salesman_proj_detail: function (e) {
    console.log(e.target.dataset.message_id)
    app.globalData.project_id = e.target.dataset.project_id
    console.log("app.globalData.message_id:" + app.globalData.message_id)
    wx.navigateTo({
      url: '../salesman_proj_detail/salesman_proj_detail',
    })
  },
  load:function(){
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/LSD/get_ones_record',      //https://www.leishida.cn/LSD/get_ones_record
      method: "GET",
      data: {
        // identity:wx.getStorageSync('identity'),
        name: wx.getStorageSync('name')
      },
      header: {
        'content-type': 'application/json'  //默认值
      },
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data)
          //如果正常响应
          that.setData({
            voicemail: res.data
          })
          if (res.data.length == 0) {
            wx.showToast({
              title: '暂无留言',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          console(res.statusCode)
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求超时',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load()
  },
  onShow:function(){      //返回页面刷新
    this.load()
  }
})