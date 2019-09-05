// pages/view_salesman/view_salesman.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    salesman: [{
        user_name: '张三',
        telephone:'1234567',
      },

      {
        user_name: '张三',
        telephone: '1234567',
      },
      {
        user_name: '张三',
        telephone: '1234567',
      },

      {
        user_name: '张三',
        telephone: '1234567',
      },
    ],

  },
  add_salesman: function(e) {
    wx.navigateTo({
      url: '../add_salesman/add_salesman',
    })
  },
  onLoad:function(){
    var that = this
    wx.request({
      url: 'https://www.leishida.cn/all-salesman',
      method:'GET',
      data:{},
      success:function(res){
        if(res.statusCode == 200){
          that.setData({
            salesman: res.data
          })
        }else{
          console.log(res.statusCode)
        }
      },
      fail:function(r){
        console.log(r)
        wx.showToast({
          title: '网络超时',
          icon:'none'
        })
      }
    })
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
            url: 'https://www.leishida.cn/del-salesman',
            data: {
              name: e.target.dataset.user_name
            },
            method: "POST",
            success: function (res) {       
              if (res.statusCode == 200) {
                if (res.status == true) {
                  wx.showToast({
                    title: '删除成功',
                  })
                //删除成功后重新加载界面
                  wx.request({
                    url: 'https://www.leishida.cn/all-salesman',
                    method: 'GET',
                    data: {},
                    success: function (res) {
                      if (res.statusCode == 200) {
                        that.setData({
                          salesman: res.data
                        })
                      } else {
                        console.log(res.statusCode)
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
    
  }
})