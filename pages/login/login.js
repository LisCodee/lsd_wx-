// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    password:'',
    identity:'',
    status:''
  },
  login:function(e){
    var that = this;
    wx.request({              //向后台发送登录请求
      url: 'https://www.leishida.cn/login',
      data:{
        name: that.data.name,
        password:that.data.password
      },
      header:{
        'content-type': 'application/json'  //默认值
      },
      method:"POST",
      success:function(res){                //请求成功的回执函数
      if(res.statusCode == 200){
        if (res.status == true) {             //密码正确
          wx.setStorage({                   //免登陆缓存
            key: 'name',
            data: res.data.name,
            key: 'password',
            data: res.data.password,
            key:'identity',
            data:res.data.identity
          })
          if (res.identity == 'boss') {
            wx.redirectTo({
              url: '../boss_index/boss_index',
            })
          }
          if (res.identity == 'salesman') {
            wx.redirectTo({
              url: '../salesman_index/salesman_index',
            })
          }
        }
        else{
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'none',
            duration: 2000
          })
        }
      }
      else{
        wx.showToast({
          title: '请检查网络连接',
          icon:'none',
          duration:1000
        })
      }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.identity == 'boss'){
      wx.redirectTo({
        url: '../boss_index/boss_index',
      })
    }
    else if(app.globalData.identity == 'salesman'){
      wx.redirectTo({
        url: '../salesman_index/salesman_index',
      })
    }
  },
  event_name_change:function(e){
      this.setData({
        name:e.detail.value
      })
      console.log("name:" + this.data.name)
  },
  event_password_change:function(e){
    this.setData({
      password:e.detail.value
    })
    console.log("password:" + this.data.password)
  }
})