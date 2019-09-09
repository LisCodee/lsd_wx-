// pages/view_salesman/view_salesman.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    salesman: [],

  },
  add_salesman: function(e) {
    wx.navigateTo({
      url: '../add_salesman/add_salesman',
    })
  },
  load:function(){
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/LSD/all_salesman',      //https://www.leishida.cn/LSD/all_salesman
      method: 'GET',
      data: {},
      success: function (res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          that.setData({
            salesman: res.data
          })
          console.log(that.data.salesman)
        } else {
          console.log(res.data.statusCode)
        }
      },
      fail: function (r) {
        console.log(r)
        wx.showToast({
          title: '网络超时',
          icon: 'none'
        })
      }
    })
  },
  onLoad:function(){
    this.load()
  },
  onShow:function(){
    this.load()
  },
  delete_salesman:function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除该业务员？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log(e.target.dataset.user_name)
          wx.request({
            url: 'http://127.0.0.1:8000/LSD/del_salesman/',  //
            data: {
              user_name: e.target.dataset.user_name
            },
            method: "POST",
            success: function (res) {       
              if (res.statusCode == 200) {
                if (res.data.status == true) {
                  wx.showToast({
                    title: '删除成功',
                  })
                  that.onLoad()
                }
                else{
                  wx.showToast({
                    title: '删除失败，请重试',
                    icon:'none'
                  })
                }
              }
              else{
                console.log(res.statusCode)
              }
            },
            fail:function(e){
              console.log(e)
              wx.showToast({
                title: '连接超时,请重试',
                icon:'none'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  look_for_pro:function(e){
    // var search_name = e.target.dataset.user_name
    // wx.setStorage({
    //   key: 'search_name',
    //   data: search_name,
    // })
    app.globalData.search_name = e.target.dataset.user_name
    wx.navigateTo({
      url: '../search_pro/search_pro',
    })
  }
})