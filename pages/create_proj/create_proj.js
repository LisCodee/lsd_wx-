// pages/create_proj/create_proj.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project_name:'',
    source:'',
    contacts:'',
    telephone:'',
    introduction:''
  },
  project_name_change:function(e){
    this.setData({
      project_name:e.detail.value
    })
    console.log("project_name:" + this.data.project_name)
  },
  pro_source_change:function(e){
    this.setData({
      source: e.detail.value
    })
    console.log("pro_source:" + this.data.source)
  },
  other_name_change:function(e){
    this.setData({
      contacts: e.detail.value
    })
    console.log("contacts:" + this.data.contacts)
  },
  other_tel_change: function (e) {
    this.setData({
      telephone: e.detail.value
    })
    console.log("telephone:" + this.data.telephone)
  },
  brief_change: function (e) {
    this.setData({
      introduction:e.detail.value
    })
    console.log("introduction:" + this.data.introduction)
  },
  send:function(e){
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/LSD/add_project/',      //https://www.leishida.cn/LSD/add_project
      data:{
        project_name:that.data.project_name,
        source:that.data.source,
        introduction:that.data.introduction,
        contacts:that.data.contacts,
        telephone:that.data.telephone
      },
      header:{
        'content-type':'application/json'
      },
      method:'POST',
      success:function(res){
        if(res.statusCode == 200){
          if(res.data.status == true){
            wx.showToast({
              title: '创建成功',
            })
            if(app.globalData.identity == 'boss'){
              wx.redirectTo({
                url: '../boss_index/boss_index',
              })
            }
            else{
              wx.redirectTo({
                url: '../salesman_index/salesman',
              })
            }
          }
        }
        else{
          wx.showToast({
            title: '出现错误，请重试',
            icon:'none'
          })
        }
      },
      fail:function(e){
        wx.showToast({
          title: '网络连接超时',
          icon:'none'
        })
        console.log(e.detail.value)
      }
    })
  }
})