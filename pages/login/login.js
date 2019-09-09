// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: '',
    identity: '',
    status: ''
  },
  login: function(e) {
    var that = this;
    wx.request({ //向后台发送登录请求
      url: 'http://127.0.0.1:8000/LSD/login/',  //https://www.leishida.cn/login
      data: {
        user_name: that.data.name,
        password: that.data.password
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      method: "POST",
      success: function(res) { //请求成功的回执函数
        if (res.statusCode == 200) {
          if (res.data.status == true) { //密码正确
            wx.setStorage({
              key: 'name',
              data: that.data.name,
            })
            wx.setStorage({
              key: 'identity',
              data: res.data.identity,
            })
            wx.setStorage({ //免登陆缓存
              key: 'password',
              data: that.data.password,
            })
            if (res.data.identity == 'boss') {
              wx.redirectTo({
                url: '../boss_index/boss_index',
              })
            }
            if (res.data.identity == 'salesman') {
              wx.redirectTo({
                url: '../salesman_index/salesman_index',
              })
            }
          } else {
            wx.showToast({
              title: '用户名或密码错误,请重新输入',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          wx.showToast({
            title: '请检查网络连接',
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail: function(e) {
        console.log(e)
        wx.showToast({
          title: '网络超时，请检查网络连接',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'name',
      success: function (res) {
        console.log('name:' + res.data)
        app.globalData.name = res.data
      },
      fail: function (res) {
        console.log(res)
      }
    })
    wx.getStorage({
      key: 'password',
      success: function (res) {
        console.log('password:' + res.data)
        app.globalData.password = res.data
      },
      fail: function (res) {
        console.log(res)
      }
    })
    wx.getStorage({
      key: 'identity',
      success: function (res) {
        app.globalData.identity = res.data
        console.log('identity:' + app.globalData.identity)
        if(res.data == 'salesman'){
          wx.redirectTo({
          url: '../salesman_index/salesman_index',
        })
        }else if(res.data == 'boss'){
          wx.redirectTo({
            url: '../boss_index/boss_index',
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
    // if (app.globalData.identity == 'boss') {
    //   wx.redirectTo({
    //     url: '../boss_index/boss_index',
    //   })
    // } else if (app.globalData.identity == 'salesman') {
    //   wx.redirectTo({
    //     url: '../salesman_index/salesman_index',
    //   })
    // }
  },
  event_name_change: function(e) {
    this.setData({
      name: e.detail.value
    })
    console.log("name:" + this.data.name)
  },
  event_password_change: function(e) {
    this.setData({
      password: e.detail.value
    })
    console.log("password:" + this.data.password)
  }
})