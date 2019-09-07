// pages/proj_list/proj_list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    act_msg: [],
    search_content:''
  }, 
  load:function(){
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/LSD/all_project/',      //https://www.leishida.cn/LSD/all_project
      data: {},
      method: "GET",
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            act_msg: res.data
          })
          console.log(res.data)
          console.log(that.data.act_msg.length)
        } else {
          console.log(res.statusCode)
        }
      },
      fail: function (e) {
        console.log(e)
        wx.showToast({
          title: '网络超时，请重试',
          icon: "none"
        })
      }
    })
  },
  onLoad:function(){
    this.load()
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
            url: 'http://127.0.0.1:8000/LSD/del_project/',    //https://www.leishida.cn/LSD/del_project/
            data:{project_id:proj_id},
            method:"POST",
            success:function(res){
              if(res.statusCode == 200){
                if(res.data.status == true){
                  wx.showToast({
                    title: '删除成功',
                  })
                  that.onLoad()
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
    wx.showLoading({
      title: '搜索中..',
    })
    setTimeout(function(){
      wx.hideLoading()
    },5000)
    if(this.data.search_content == ''){
      wx.showToast({
        title: '请输入搜索内容',
        icon:'none'
      })
    }else{
      wx.request({
        url: 'http://127.0.0.1:8000/LSD/search_project',    //https://www.leishida.cn/LSD/search_projects
        data:{
          key:that.data.search_content
        },
        method:"GET",
        success:function(res){
          if(res.statusCode == 200){
            wx.hideLoading()
            that.setData({
              act_msg:res.data,
            })
            if(res.data.length == 0){
              wx.showToast({
                title: '没有查到',
                icon:'none',
                duration:2000
              })
            }
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
        },
        complete:function(res){
          that.setData({
            search_content: ''
          })
        }
      })
    }
  }
})