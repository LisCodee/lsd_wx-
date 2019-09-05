// pages/boss_proj_detail/boss_proj_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proj_title: '雷士达项目管理系统',
    principal: '王亚莉',
    contact_person: '李景新',
    contact_method: '110',
    creation_time: '2019/08/30',

    report_topic: '雷士达项目管理系统',
    report_man: '王亚莉',
    report_time: '2019/08/30',

    boss_reply: '做的不错',
  },
  see_more: function (e) {
    wx.navigateTo({
      url: '../see_more/see_more',
    })
  },
  proj_report: function (e) {
    wx.navigateTo({
      url: '../proj_report/proj_report',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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