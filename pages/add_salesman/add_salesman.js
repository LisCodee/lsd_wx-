// pages/add_salesman/add_salesman.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    password:'',
    telephone:'',
  },
  name_change:function(e){
    this.setData({
      name:e.detail.value
    })
    console.log("name:" + this.data.name)
  },
  password_change:function(e){
    this.setData({
      password: e.detail.value
    })
    console.log("password:" + this.data.password)
  },
  phone_change:function(e){
    this.setData({
      telephone:e.detail.value
    })
  },
  send:function(){
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/LSD/add_salesman/',      //https://www.leishida.cn/LSD/add-salesman
      data:{
        user_name:that.data.name,
        password:that.data.password,
        telephone:that.data.telephone
      },
      method:"POST",
      success:function(res){
        if(res.statusCode == 200){
          if(res.data.status == true){
            wx.showToast({
              title: '添加成功',
              duration:2000
            })
            wx.reLaunch({
              url: '../boss_index/boss_index',
            })
          }
          else{
            wx.showToast({
              title: '添加失败，请重试',
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
          title: '网络连接超时,请重试',
          icon:'none'
        })
      }
    })
  }
})