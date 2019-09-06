// pages/proj_list/proj_list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    act_msg: [{
        proj_id:'1',
        proj_name: '微信小程序',
        proj_time: '时间:09月01日 周日 17:00',
        proj_leader: '吴楠',
      },

      {
        proj_id:'2',
        proj_name: '微信小程序02',
        proj_time: '时间:09月01日 周日 17:00',
        proj_leader: '吴楠02',
      },
    ],
    search_content:''
  }, 
  onLoad:function(){
    var that = this
    wx.request({
      url: 'https://www.leishida.cn/all-project',
      data:{},
      method:"GET",
      success:function(res){
        if(res.statusCode == 200){
          that.setData({
            act_msg: res.data
          })
        }else{
          console.log(res.statusCode)
        }
      },
      fail:function(e){
        console.log(e)
        wx.showToast({
          title: '网络超时，请重试',
          icon:"none"
        })
      }
    })
  },
  boss_proj_detail:function(e){
    wx.navigateTo({
      url: '../boss_proj_detail/boss_proj_detail',
    })
  },
  del:function(e){
    var that = this
    var proj_id = e.target.dataset.proj_id      //获取要删除的项目id
    console.log("proj_id:" + proj_id)
    wx.showModal({
      title: '提示',
      content: '确定删除此项目？',
      success(res) {
        if (res.confirm) {    //确定后向后台发送消息
          wx.request({
            url: 'https://www.leishida.cn/del-project',
            data:{project_id:proj_id},
            method:"POST",
            success:function(res){
              if(res.statusCode == 200){
                if(res.data.status == true){
                  wx.showToast({
                    title: '删除成功',
                  })
                }else{
                  wx.showToast({
                    title: '删除失败，请重试',
                    icon:'none'
                  })
                }
              }else{
                console.log(res.statusCode)
              }
            },
            fail:function(e){
              console.log(e.errMsg)
              wx.showToast({
                title: '网络超时，请重试',
                icon:'none'
              })
            }
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  send: function(e) {
    wx.navigateTo({
      url: '../create_proj/create_proj',
    })
  },
  boss_proj_detail: function(e) {
    app.globalData.project_id = e.target.dataset.proj_id
    console.log("app.globalData.project_id:" + app.globalData.project_id)
    wx.navigateTo({
      url: '../boss_proj_detail/boss_proj_detail',
    })
  },
  search_change:function(e){
    this.setData({
      search_content:e.detail.value
    })
    console.log("search_content:" + this.data.search_content)
  },
  search:function(e){
    console.log("用户点击了搜索")
    var that = this
    if(this.data.search_content == ''){
      wx.showToast({
        title: '请输入搜索内容',
        icon:'none'
      })
    }else{
      wx.request({
        url: 'https://www.leishida.cn/search-projects',
        data:{
          key:that.data.search_content
        },
        method:"GET",
        success:function(res){
          if(res.statusCode == 200){
            that.setData({
              act_msg:res.data
            })
          }else{
            console.log(res.statusCode)
            wx.showToast({
              title: '请重试',
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
    }
  }
})