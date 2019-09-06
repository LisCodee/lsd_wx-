// pages/boss_proj_detail/boss_proj_detail.js
var app = getApp()
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

    message: [{status:0, report_id: '1', report_name: '雷士达项目管理系统', reporter:'王亚莉',time:'2019/08/30',voicemail:[]},
    {status:1,content:'留言信息',time:'留言时间'}],
    voicemail:''
    // report_topic: '雷士达项目管理系统',
    // report_man: '王亚莉',
    // report_time: '2019/08/30',

    // boss_reply: '做的不错',
  },
  onLoad:function(){
    var that = this
    wx.request({
      url: 'https://www.leishida.cn/single-project-detail',
      data:{
        project_id:app.globalData.project_id
      },
      method:"GET",
      success:function(res){
        if(res.statusCode == 200){
          that.setData({
            project_name:res.data.project_name,
            source:res.data.source,
            contacts:res.data.contacts,
            telephone:res.data.telephone,
            introduction:res.data.introduction
          })
        }else{
          console.log(res.statusCode)
          wx.showToast({
            title: '请退出重试',
            icon:'none'
          })
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
    wx.request({
      url: 'https://www.leishida.cn/project-report--record',
      data:{},
      method:"GET",
      success:function(res){
        if(res.statusCode == 200){
          that.setData({
            message: res.data
          })
        }else{
          console.log(res.statusCode)
          wx.showToast({
            title: '请刷新',
            icon:'none'
          })
        }
      },
      fail:function(e){
        console.log(e)
        wx.showToast({
          title: '网络超时，请重试',
          icon:'none'
        })
      }
    })
  },
  boss_see_more: function (e) {
    wx.navigateTo({
      url: '../boss_see_more/boss_see_more',
    })
  },
  leave_message:function(e){
    this.setData({
      voicemail:e.detail.value 
    })
    console.log(this.data.voicemail)
  },
  send:function(){
    var that = this
    if(this.data.voicemail == ''){
      wx.showToast({
        title: '请输入留言内容',
        icon:'none'
      })
    }else{
      wx.request({
        url: 'https://www.leishida.cn/record',
        data:{
          project_id:app.globalData.project_id,
          content:that.data.voicemail
        },
        method:"POST",
        success:function(res){
          if(res.statusCode == 200){
            wx.showToast({
              title: '留言成功',
            })
            this.onLoad       //刷新页面
          }else{
            wx.showToast({
              title: '请重试',
              icon:'none'
            })
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
  }
})