// pages/salesman_proj/salesman_proj.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act_msg: [],
  },
  salesman_proj_detail:function(e){
    console.log(e.target.dataset.id)
    app.globalData.project_id = e.target.dataset.id,
    console.log("globalData.project_id:" + app.globalData.project_id)
    wx.navigateTo({
      url: '../salesman_proj_detail/salesman_proj_detail',
    })
  },
  onLoad:function(){
    var that = this
    var name;
    // wx.getStorage({
    //   key: 'name',
    //   success: function(res) {
    //     name = res.data
    //   },
    //   fail:function(res){
    //     console.log(res.data)
    //   }
    // })
    wx.request({
      url: 'http://127.0.0.1:8000/LSD/search_with_salesman',    //https://www.leishida.cn/LSD/search-with-salesman
      method:"GET",
      data:{
        user_name:wx.getStorageSync('name')
      },
      success:function(res){
        if(res.statusCode == 200){
          that.setData({
            act_msg: res.data
          })
          console.log(that.data.act_msg)
          if (that.data.act_msg.length == 0) {
            wx.showToast({
              title: '暂无项目',
              icon: 'none',
              duration: 2000
            })
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