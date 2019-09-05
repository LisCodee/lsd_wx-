// pages/salesman_proj_detail/salesman_proj_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project_name:'雷士达项目管理系统',
    source:'马化腾',
    contacts:'李景新',
    telephone:'110',
    creation_time:'2019/08/30',

    report_topic:'雷士达项目管理系统',
    report_man:'王亚莉',
    report_time:'2019/08/30',

    boss_reply:'做的不错', 
  },
  see_more:function(e){
    wx.navigateTo({
      url: '../see_more/see_more',
    })
  },
  proj_report:function(e){
    wx.navigateTo({
      url: '../proj_report/proj_report',
    })
  }
})