// pages/add_salesman/add_salesman.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    password:''
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
  send:function(){
    var that = this
    wx.request({
      url: 'https://www.leishida.cn/add-salesman',
      data:{
        name:that.data.name,
        password:that.data.password
      },
      method:"POST",
      success:function(res){
        if(res.statusCode == 200){
          if(res.status == true){
            wx.showToast({
              title: '添加成功',
            })
            wx.redirectTo({
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
          console.log(res.status)
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